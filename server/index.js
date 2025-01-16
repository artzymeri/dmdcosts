const express = require("express");
const { Op, or, where } = require("sequelize");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const QRCode = require("qrcode");
require("dotenv").config();
const { createInvoice } = require("./createInvoice.js");
const fs = require("fs");

console.log(createInvoice);

const {
  users_table,
  cases_table,
  clients_table,
  invoices_table,
} = require("./models");

const secretKey = process.env.SECRET_KEY;

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

const db = require("./models");

const port = 7070;

app.post("/registeruser", async (req, res) => {
  const {
    name_surname,
    username,
    email_address,
    password,
    role,
    bank_details,
  } = req.body;

  if (!name_surname || !username || !email_address || !password || !role) {
    return res.json({
      title: "error",
      message: "All fields are required. Please ensure no field is left empty.",
    });
  }

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);

    const existingUsername = await users_table.findOne({
      where: { username: username },
    });

    if (existingUsername) {
      return res.json({
        title: "error",
        message: "Username is already taken",
      });
    }

    await users_table.create({
      name_surname,
      username,
      email_address,
      role,
      password: hashedPassword,
      bank_details: bank_details ? JSON.stringify(bank_details) : null,
    });

    res.json({
      title: "success",
      message: "User added successfully",
    });
  } catch (error) {
    console.error(error);
    res.json({
      title: "error",
      message: "Something went wrong",
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.json({
        title: "error",
        message: "Please fill out the values",
      });
    }

    const user = await users_table.findOne({ where: { username } });

    if (!user || !bcrypt.compareSync(password, user?.password)) {
      return res.json({
        title: "error",
        message: "Wrong credentials",
      });
    }

    const tokenPayload = {
      email_address: user?.email_address,
      role: user?.role,
    };

    const tokenOptions = {
      expiresIn: "1h",
    };

    const token = jwt.sign(tokenPayload, secretKey, tokenOptions);
    const cookieName = user?.role === "admin" ? "adminToken" : "employeeToken";

    res.cookie(cookieName, token, { httpOnly: true });

    res.json({
      title: "success",
      message: "Successful login",
      token,
      name_surname: user?.name_surname,
      username: user?.username,
      bank_details: user?.bank_details || null, // Include only if admin
      email_address: user?.email_address,
      role: user?.role,
      id: user?.id,
    });
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.post("/edit-user-data", async (req, res) => {
  const { edit_user_data } = req.body;
  if (!edit_user_data.username || !edit_user_data.name_surname) {
    return res.json({
      title: "error",
      message: "Username and Name & Surname cannot be empty",
    });
  }
  try {
    const userToEdit = await users_table.findOne({
      where: { id: edit_user_data.id },
    });
    userToEdit.name_surname = edit_user_data.name_surname;
    userToEdit.email_address = edit_user_data.email_address;
    userToEdit.username = edit_user_data.username;
    userToEdit.bank_details = JSON.stringify({
      account_holder: edit_user_data?.account_holder,
      account_number: edit_user_data?.account_number,
      sort_code: edit_user_data?.sort_code,
    });
    await userToEdit.save();
    res.json({
      title: "success",
      message: "User Details saved successfully",
    });
  } catch (e) {
    console.log(e);
    res.json({
      title: "error",
      message: `Error: ${e}`,
    });
  }
});

app.post(`/change-user-password:user_id`, async (req, res) => {
  const { user_id } = req.params;
  const { new_password } = req.body;
  try {
    const userToChange = await users_table.findOne({
      where: { id: user_id },
    });
    const hashedPassword = bcrypt.hashSync(new_password, 10);
    userToChange.password = hashedPassword;
    await userToChange.save();
    res.json({
      title: "success",
      message: "User Password changed successfully",
    });
  } catch (e) {
    console.log(e);
    res.json({
      title: "error",
      message: "Something went wrong",
    });
  }
});

app.get("/allemployees", async (req, res) => {
  const employees = await users_table.findAll();
  res.json(employees);
});

app.post(`/deleteemployee:employee_id`, async (req, res) => {
  const { employee_id } = req.params;
  try {
    const employeeToDelete = await users_table.findOne({
      where: { id: employee_id },
    });
    await employeeToDelete.destroy();
    res.json({
      title: "success",
      message: "Employee Deleted Successful",
    });
  } catch (e) {
    console.log(e);
    res.json({
      title: "error",
      message: "Something went wrong",
    });
  }
});

app.post("/createcase", async (req, res) => {
  const {
    client_id,
    assignee_id,
    claimant_name,
    client_reference_number,
    defendant_name,
    defendant_reference_number,
    defendant_email,
    rate_per_hour,
    type,
    negotiable,
    date_instructed,
  } = req.body;

  if (
    !client_id ||
    !assignee_id ||
    !claimant_name ||
    !client_reference_number ||
    !defendant_name ||
    !defendant_reference_number ||
    !rate_per_hour ||
    !type ||
    !date_instructed
  ) {
    return res.json({
      title: "error",
      message: "Please fill out all the values.",
    });
  }

  try {
    const newCase = await cases_table.create({
      client_id,
      assignee_id,
      claimant_name,
      client_reference_number,
      defendant_name,
      defendant_reference_number,
      defendant_email,
      rate_per_hour,
      type,
      negotiable,
      status: "to-draft",
      pod_checked: false,
      date_instructed,
      qr_code: null,
    });

    const qrCodeData = await QRCode.toDataURL(newCase.id.toString());

    await newCase.update({ qr_code: qrCodeData });

    res.json({
      title: "success",
      message: "Request done successfully",
    });
  } catch (e) {
    console.log(e);
    res.json({
      title: "error",
      message: "Something went wrong",
    });
  }
});

app.post("/editcase", async (req, res) => {
  const {
    id: case_id,
    client_id,
    assignee_id,
    claimant_name,
    client_reference_number,
    defendant_name,
    defendant_reference_number,
    defendant_email,
    rate_per_hour,
    type,
    negotiable,
    date_instructed,
    checked_date,
    settled_date,
  } = req.body;

  if (
    !client_id ||
    !assignee_id ||
    !claimant_name ||
    !client_reference_number ||
    !defendant_name ||
    !defendant_reference_number ||
    !rate_per_hour ||
    !type ||
    !date_instructed
  ) {
    return res.json({
      title: "error",
      message: "Please fill out all the values.",
    });
  }

  try {
    const caseToEdit = await cases_table.findOne({
      where: { id: case_id },
    });
    caseToEdit.client_id = client_id;
    caseToEdit.assignee_id = assignee_id;
    caseToEdit.claimant_name = claimant_name;
    caseToEdit.client_reference_number = client_reference_number;
    caseToEdit.defendant_name = defendant_name;
    caseToEdit.defendant_reference_number = defendant_reference_number;
    caseToEdit.defendant_email = defendant_email;
    caseToEdit.rate_per_hour = rate_per_hour;
    caseToEdit.type = type;
    caseToEdit.negotiable = negotiable;
    caseToEdit.date_instructed = date_instructed;
    caseToEdit.checked_date = checked_date;
    caseToEdit.settled_date = settled_date;

    await caseToEdit.save();
    res.json({
      title: "success",
      message: "Case Edited successfully",
    });
  } catch (e) {
    console.log(e);
    res.json({
      title: "error",
      message: "Something went wrong",
    });
  }
});

app.get(`/allcases`, async (req, res) => {
  try {
    const cases_array = await cases_table.findAll();
    res.send(cases_array);
  } catch (e) {
    console.log(e);
    res.json({
      title: "error",
      message: "Something went wrong",
    });
  }
});

app.get(`/all_assigned_cases`, async (req, res) => {
  const { user_id } = req.query;
  try {
    const cases_array = await cases_table.findAll({
      where: { assignee_id: user_id },
    });
    res.send(cases_array);
  } catch (e) {
    console.log(e);
    res.json({
      title: "error",
      message: "Something went wrong",
    });
  }
});

app.get(`/cases:client_id`, async (req, res) => {
  const { client_id } = req.params;
  try {
    const cases_array = await cases_table.findAll({
      where: { sender_id: client_id },
    });
    res.send(cases_array);
  } catch (e) {
    console.log(e);
    res.json({
      title: "error",
      message: "Something went wrong",
    });
  }
});

app.post(`/cancelcase:case_id`, async (req, res) => {
  const { case_id } = req.params;
  try {
    const caseToCancel = await cases_table.findOne({
      where: { id: case_id },
    });
    caseToCancel.progress = "cancelled";
    await caseToCancel.save();
    res.json({
      title: "success",
      message: "Case cancelled successfully",
    });
  } catch (e) {
    console.log(e);
    res.json({
      title: "error",
      message: "Something went wrong",
    });
  }
});

app.post(`/deletecase:case_id`, async (req, res) => {
  const { case_id } = req.params;
  try {
    const caseToDelete = await cases_table.findOne({
      where: { id: case_id },
    });
    await caseToDelete.destroy();
    res.json({
      title: "success",
      message: "Case deleted successfully",
    });
  } catch (e) {
    console.log(e);
    res.json({
      title: "error",
      message: "Something went wrong",
    });
  }
});

app.post(`/delete-invoice:invoice_id`, async (req, res) => {
  const { invoice_id } = req.params;
  try {
    const invoiceToDelete = await invoices_table.findOne({
      where: { id: invoice_id },
    });
    await invoiceToDelete.destroy();
    res.json({
      title: "success",
      message: "Invoices deleted successfully",
    });
  } catch (e) {
    console.log(e);
    res.json({
      title: "error",
      message: "Something went wrong",
    });
  }
});

app.post(`/changecasestatus:case_id`, async (req, res) => {
  const { case_id } = req.params;
  const { status, date } = req.body;
  try {
    let includedInvoice = null;
    const caseToUpdate = await cases_table.findOne({
      where: { id: case_id },
    });
    if (status == "checked") {
      caseToUpdate.checked_date = date;
    }
    if (status == "settled") {
      caseToUpdate.settled_date = date;
    }
    if (status == "paid") {
      const invoicesTable = await invoices_table.findAll();
      for (const invoice of invoicesTable) {
        const parsedCasesInvolved = JSON.parse(
          invoice?.dataValues?.cases_involved
        );
        const foundCase = parsedCasesInvolved.find((c) => c == case_id);
        if (foundCase) {
          includedInvoice = invoice;
        }
      }
    }

    caseToUpdate.status = status;
    if (includedInvoice) {
      includedInvoice.paid = true;
      await includedInvoice.save();
    }
    await caseToUpdate.save();
    res.json({
      title: "success",
      message: "Case status changed successfully",
    });
  } catch (e) {
    console.log(e);
    res.json({
      title: "error",
      message: "Something went wrong",
    });
  }
});

app.post(`/addnewcaseoffer:case_id`, async (req, res) => {
  const { case_id } = req.params;
  const {
    new_offer_date,
    new_offer_value,
    formality,
    pod_due_date,
    type,
    offer_id,
    first_offer,
  } = req.body;
  try {
    const caseToUpdate = await cases_table.findOne({
      where: { id: case_id },
    });

    let previousArray = JSON.parse(caseToUpdate.offers) || [];

    if (first_offer) {
      previousArray.push({
        id: new Date().getTime(),
        sent: {
          date: new_offer_date,
          value: new_offer_value,
          formality: formality,
        },
      });
      if (formality) {
        caseToUpdate.pod_due_date = pod_due_date;
      }
      caseToUpdate.offers = JSON.stringify(previousArray);
      caseToUpdate.status = "served";

      await caseToUpdate.save();
      res.json({
        title: "success",
        message: "Case marked as served successfully",
      });
      return;
    }

    if (type == "sent") {
      previousArray.push({
        id: new Date().getTime(),
        sent: {
          date: new_offer_date,
          value: new_offer_value,
        },
      });
    } else {
      const offerToEdit = previousArray.find((offer) => offer.id == offer_id);
      offerToEdit.received = {
        id: new Date().getTime(),
        date: new_offer_date,
        value: new_offer_value,
      };
    }

    caseToUpdate.offers = JSON.stringify(previousArray);

    await caseToUpdate.save();
    res.json({
      title: "success",
      message:
        type == "sent"
          ? "Case Offer added successfully"
          : "Case received offer added successfully",
    });
  } catch (e) {
    console.log(e);
    res.json({
      title: "error",
      message: "Something went wrong",
    });
  }
});

app.post(`/delete-case-offer:case_id`, async (req, res) => {
  const { case_id } = req.params;
  const { offer_id } = req.body;
  try {
    const foundCase = await cases_table.findOne({
      where: { id: case_id },
    });

    let previousArray = JSON.parse(foundCase.offers) || [];

    const newArray = previousArray.filter((offer) => offer.id !== offer_id);

    foundCase.offers = JSON.stringify(newArray);

    await foundCase.save();
    res.json({
      title: "success",
      message: "Case offer deleted successfully",
    });
  } catch (e) {
    console.log(e);
    res.json({
      title: "error",
      message: "Something went wrong",
    });
  }
});

app.post(`/change-case-pod-status:case_id`, async (req, res) => {
  const { case_id } = req.params;
  const { boolean } = req.body;
  try {
    const foundCase = await cases_table.findOne({
      where: { id: case_id },
    });

    foundCase.pod_checked = boolean;

    await foundCase.save();
    res.json({
      title: "success",
      message: "Case POD Status changed successfully",
    });
  } catch (e) {
    console.log(e);
    res.json({
      title: "error",
      message: "Something went wrong",
    });
  }
});

app.post(`/extend-pod-due-date:case_id`, async (req, res) => {
  const { case_id } = req.params;
  const { date } = req.body;
  try {
    const foundCase = await cases_table.findOne({
      where: { id: case_id },
    });

    foundCase.pod_due_date = date;

    await foundCase.save();
    res.json({
      title: "success",
      message: "Case POD Date changed successfully",
    });
  } catch (e) {
    console.log(e);
    res.json({
      title: "error",
      message: "Something went wrong",
    });
  }
});

app.get("/employees/:employee_id/cases/:case_id", async (req, res) => {
  const { employee_id, case_id } = req.params;
  try {
    const caseData = await cases_table.findOne({
      where: {
        id: case_id,
        sender_id: employee_id,
      },
    });

    if (caseData) {
      res.json({
        title: "success",
        message: "Case found",
        case: caseData,
      });
    } else {
      res.json({
        title: "error",
        message: "Case not found",
      });
    }
  } catch (error) {
    console.error("Error fetching case details:", error);
    res.json({
      title: "error",
      message: "Something went wrong",
    });
  }
});

app.get("/case:case_id", async (req, res) => {
  const { case_id } = req.params;
  try {
    const caseData = await cases_table.findOne({
      where: {
        id: case_id,
      },
    });

    if (caseData) {
      res.json({
        title: "success",
        message: "Case found",
        case: caseData,
      });
    } else {
      res.json({
        title: "error",
        message: "Case not found",
      });
    }
  } catch (error) {
    console.error("Error fetching case details:", error);
    res.json({
      title: "error",
      message: "Something went wrong",
    });
  }
});

app.get("/case:case_id", async (req, res) => {
  const { case_id } = req.params;
  const { user_id } = req.body;
  try {
    const caseData = await cases_table.findOne({
      where: {
        id: case_id,
        assignee_id: user_id,
      },
    });

    if (caseData) {
      res.json({
        title: "success",
        message: "Case found",
        case: caseData,
      });
    } else {
      res.json({
        title: "error",
        message: "Case not found",
      });
    }
  } catch (error) {
    console.error("Error fetching case details:", error);
    res.json({
      title: "error",
      message: "Something went wrong",
    });
  }
});

app.get("/invoice-case:case_id", async (req, res) => {
  const { case_id } = req.params;
  try {
    const invoices_list = await invoices_table.findAll();

    let casesArray = [];

    let foundInvoice = null;

    for (item of invoices_list) {
      const cases_involved = JSON.parse(item.cases_involved);
      if (cases_involved.some((c) => c == case_id)) {
        foundInvoice = item;
      }
      for (c of cases_involved) {
        casesArray.push(c);
      }
    }

    const foundCase = casesArray.find((c) => c == case_id);

    if (foundCase) {
      res.json({
        title: "success",
        message: "Invoice found",
        case: foundCase,
        invoice: foundInvoice,
      });
    } else {
      res.json({
        title: "error",
        message: "Invoice not found",
        case: null,
      });
    }
  } catch (error) {
    console.error("Error fetching case details:", error);
    res.json({
      title: "error",
      message: "Something went wrong",
    });
  }
});

app.post(`/insert-invoices:admin_id`, async (req, res) => {
  const { admin_id } = req.params;
  const { cases_array, client_id } = req.body;
  try {
    await invoices_table.create({
      cases_involved: JSON.stringify(cases_array),
      client_id,
      admin_id,
      paid: false,
      sent: false,
    });

    res.json({
      title: "success",
      message: "Invoice added successfully",
    });
  } catch (e) {
    console.log(e);
    res.json({
      title: "error",
      message: "Something went wrong",
    });
  }
});

app.get(`/allinvoices`, async (req, res) => {
  try {
    const invoices_array = await invoices_table.findAll();
    res.send(invoices_array);
  } catch (e) {
    console.log(e);
    res.json({
      title: "error",
      message: "Something went wrong",
    });
  }
});

app.get(`/allclients`, async (req, res) => {
  try {
    const clients_array = await clients_table.findAll();
    res.send(clients_array);
  } catch (e) {
    console.log(e);
    res.json({
      title: "error",
      message: "Something went wrong",
    });
  }
});

app.post("/addclient", async (req, res) => {
  const {
    business_name,
    address1,
    address2,
    address3,
    city,
    post_code,
    email_address,
    initials,
  } = req.body;

  if (!business_name || !address1 || !email_address || !initials) {
    return res.json({
      title: "error",
      message: "Values cannot be null.",
    });
  }

  const existingFirmName = await clients_table.findOne({
    where: { business_name: business_name },
  });

  if (existingFirmName) {
    return res.json({
      title: "error",
      message: "Firm Name already exists!",
    });
  }

  try {
    await clients_table.create({
      business_name,
      address1,
      address2,
      address3,
      city,
      post_code,
      email_address,
      initials,
    });

    res.json({
      title: "success",
      message: "Client added successfully",
    });
  } catch (e) {
    console.log(e);
    res.json({
      title: "error",
      message: "Something went wrong",
    });
  }
});

app.post(`/updateclient:client_id`, async (req, res) => {
  const { client_id } = req.params;
  const {
    business_name,
    address1,
    address2,
    address3,
    city,
    post_code,
    email_address,
    initials,
  } = req.body;
  try {
    const clientToUpdate = await clients_table.findOne({
      where: { id: client_id },
    });

    if (!clientToUpdate) {
      return res.status(404).json({
        title: "error",
        message: "Client not found",
      });
    }

    clientToUpdate.business_name = business_name;
    clientToUpdate.address1 = address1;
    clientToUpdate.address2 = address2;
    clientToUpdate.address3 = address3;
    clientToUpdate.city = city;
    clientToUpdate.post_code = post_code;
    clientToUpdate.email_address = email_address;
    clientToUpdate.initials = initials;

    await clientToUpdate.save();

    res.json({
      title: "success",
      message: "Client updated successfully",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      title: "error",
      message: "Something went wrong",
    });
  }
});

app.post(`/deleteclient:client_id`, async (req, res) => {
  const { client_id } = req.params;
  try {
    const clientToDelete = await clients_table.findOne({
      where: { id: client_id },
    });
    await clientToDelete.destroy();
    res.json({
      title: "success",
      message: "Client deleted successfully",
    });
  } catch (e) {
    console.log(e);
    res.json({
      title: "error",
      message: "Something went wrong",
    });
  }
});

app.get("/client:client_id", async (req, res) => {
  const { client_id } = req.params;
  try {
    const clientData = await clients_table.findOne({
      where: {
        id: client_id,
      },
    });

    clientData.initials = clientData.initials;

    if (clientData) {
      res.json({
        title: "success",
        message: "Client found",
        client: clientData,
      });
    } else {
      res.json({
        title: "error",
        message: "Client not found",
      });
    }
  } catch (error) {
    console.error("Error fetching case details:", error);
    res.json({
      title: "error",
      message: "Something went wrong",
    });
  }
});

app.post(`/produce-single-invoices`, async (req, res) => {
  const { cases_involved, admin_id } = req.body;
  try {
    for (const item of cases_involved) {
      const array = [item.id];
      await invoices_table.create({
        cases_involved: JSON.stringify(array),
        client_id: item.client_id,
        admin_id,
        paid: false,
        sent: false,
      });
    }
    res.json({
      title: "success",
      message: "Single Invoices produced successfully",
    });
  } catch (e) {
    console.log(e);
    res.json({
      title: "error",
      message: "Something went wrong",
    });
  }
});

app.post(`/produce-bundle-invoices:client_id`, async (req, res) => {
  const { client_id } = req.params;
  const { cases_involved, admin_id } = req.body;
  try {
    let casesIds = [];
    for (const item of cases_involved) {
      casesIds.push(item.id);
    }
    await invoices_table.create({
      cases_involved: JSON.stringify(casesIds),
      client_id,
      admin_id,
      paid: false,
      sent: false,
    });
    res.json({
      title: "success",
      message: "Bundle Invoices produced successfully",
    });
  } catch (e) {
    console.log(e);
    res.json({
      title: "error",
      message: "Something went wrong",
    });
  }
});

app.post("/download-invoice", async (req, res) => {
  const { invoice } = req.body;
  const admin = await users_table.findByPk(parseInt(invoice.admin_id));
  const client = await clients_table.findByPk(parseInt(invoice.client_id));
  invoice.cases_involved = JSON.parse(invoice.cases_involved);
  const cases_data = [];
  for (id of invoice.cases_involved) {
    const row = await cases_table.findByPk(parseInt(id));
    cases_data.push(row.dataValues);
  }
  invoice.cases_data = cases_data;
  try {
    await createInvoice(invoice, admin, client, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      title: "error",
      message: "Something went wrong",
    });
  }
});

app.post("/find-invoice", async (req, res) => {
  const { case_id } = req.body;

  let invoiceData = await invoices_table.findOne({
    where: {
      cases_involved: {
        [Op.like]: `%${case_id}%`, // Matches case_id within the stringified array
      },
    },
  });

  let invoice = invoiceData?.dataValues;
  if (invoice) {
    const admin = await users_table.findByPk(parseInt(invoice.admin_id));
    const client = await clients_table.findByPk(parseInt(invoice.client_id));
    invoice.cases_involved = JSON.parse(invoice.cases_involved);
    const cases_data = [];
    for (id of invoice.cases_involved) {
      const row = await cases_table.findByPk(parseInt(id));
      cases_data.push(row.dataValues);
    }
    invoice.cases_data = cases_data;
    try {
      await createInvoice(invoice, admin, client, res);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        title: "error",
        message: "Something went wrong",
      });
    }
  } else {
    res.status(500).json({
      title: "error",
      message: "Something went wrong",
    });
  }
});

db.sequelize.sync().then((req) => {
  app.listen(port, () => {
    console.log(`Server is running successfully`);
  });
});
