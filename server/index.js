const express = require("express");
const { Op, or } = require("sequelize");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const QRCode = require("qrcode");
require("dotenv").config();
const { createInvoice } = require("./createinvoice.js");

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

const port = 8080;

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

app.get("/allemployees", async (req, res) => {
  const employees = await users_table.findAll({
    where: { role: "employee" },
  });
  res.json(employees);
});

app.post(`/deleteemployee:employee_id`, async (req, res) => {
  const { employee_id } = req.params;
  try {
    const employeeToDelete = await users_table.findOne({
      where: { id: employee_id },
    });
    console.log(employeeToDelete);
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
    sender_id,
    sender_name_surname,
    sender_business_name,
    sender_email_address,
    sender_phone_number,
    receiver_name_surname,
    receiver_phone_number,
    receiver_phone_number_2,
    receiver_city,
    receiver_state,
    receiver_full_address,
    product_price,
    product_description,
    comment,
  } = req.body;

  try {
    const newCase = await cases_table.create({
      sender_id,
      sender_name_surname,
      sender_business_name,
      sender_email_address,
      sender_phone_number,
      receiver_name_surname,
      receiver_phone_number,
      receiver_phone_number_2,
      receiver_city,
      receiver_state,
      receiver_full_address,
      product_price,
      product_description,
      comment,
      progress: "request",
      qr_code: null,
    });

    const qrCodeData = await QRCode.toDataURL(newCase.id.toString());

    await newCase.update({ qr_code: qrCodeData });

    res.json({
      title: "Success",
      message: "Request done successfully",
    });
  } catch (e) {
    console.log(e);
    res.json({
      title: "Error",
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
  const { business_name, address, email_address, rates_config } = req.body;

  try {
    await clients_table.create({
      business_name,
      address,
      email_address,
      rates_config: JSON.stringify(rates_config),
    });

    res.json({
      title: "Success",
      message: "Client added successfully",
    });
  } catch (e) {
    console.log(e);
    res.json({
      title: "Error",
      message: "Something went wrong",
    });
  }
});

app.post(`/updateclient:client_id`, async (req, res) => {
  const { client_id } = req.params;
  const { business_name, address, email_address, rates_config } = req.body;
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
    clientToUpdate.address = address;
    clientToUpdate.email_address = email_address;
    clientToUpdate.rates_config = JSON.stringify(rates_config);

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

    clientData.rates_config = JSON.parse(clientData.rates_config);

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

app.post("/generatepdfonly/:case_id", async (req, res) => {
  const { case_id } = req.params;
  const caseData = await cases_table.findByPk(case_id);

  try {
    await createInvoice(case_id, caseData, res);
  } catch (error) {
    console.log(error);
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
