const express = require("express");
const {Op, or} = require("sequelize");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const QRCode = require('qrcode');
require("dotenv").config();
const {createInvoice} = require("./createinvoice.js");


const {
    users_table,
    cases_table,
} = require("./models");

const secretKey = process.env.SECRET_KEY;


const app = express();
app.use(express.json({limit: "50mb"}));
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

const db = require("./models");

const port = 8080;

app.post("/registeremployee", async (req, res) => {
    try {
        const {name_surname, business_name, location, phone_number, email_address, password} = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);

        const existingPhoneNumberInUsers = await users_table.findOne({
            where: {phone_number: phone_number},
        });

        const existingEmailAddressInUsers = await users_table.findOne({
            where: {email_address: email_address},
        });

        if (existingPhoneNumberInUsers) {
            return res.json({
                title: "error",
                message: "Numri i paraqitur është përdorur më parë",
            });
        }

        if (existingEmailAddressInUsers) {
            return res.json({
                title: "error",
                message: "Email Llogaria e paraqitur është përdorur më parë",
            });
        }

        await users_table.create({
            name_surname,
            business_name,
            location,
            phone_number,
            email_address,
            password: hashedPassword,
            role: 'employee'
        });

        res.json({
            title: "success",
            message: "Regjistrimi u bë me sukses",
        });
    } catch (error) {
        console.log(error);
        res.json({
            title: "error",
            message: "Kërkesa nuk mund të realizohet"
        })
    }
});

app.post("/loginbyphone", async (req, res) => {
    try {
        const {phone_number, password} = req.body;

        if (phone_number) {
            const employee = await users_table.findOne({
                where: {phone_number: phone_number},
            });

            if (!employee || !bcrypt.compareSync(password, employee?.password)) {
                return res.json({
                    title: "error",
                    message: "Numri apo fjalëkalimi është gabim",
                });
            }


            if (employee?.role === "admin") {
                const adminToken = jwt.sign(
                    {phone_number: employee?.phone_number, role: "admin"},
                    secretKey,
                    {
                        expiresIn: "1h",
                    }
                );
                res.cookie("adminToken", adminToken, {httpOnly: true});
                res.json({
                    title: "success",
                    message: "Kyçja u bë me sukses",
                    adminToken: adminToken,
                    phone_number: employee?.phone_number,
                    business_name: employee?.business_name,
                    name_surname: employee?.name_surname,
                    location: employee?.location,
                    email_address: employee?.email_address,
                    role: employee?.role,
                    id: employee?.id
                });
            } else if (employee?.role === "employee") {
                const employeeToken = jwt.sign(
                    {phone_number: employee?.phone_number, role: "employee"},
                    secretKey
                );
                res.cookie("employee", employeeToken, {httpOnly: true});
                res.json({
                    title: "success",
                    message: "Kyçja u bë me sukses",
                    employeeToken: employeeToken,
                    phone_number: employee?.phone_number,
                    name_surname: employee?.name_surname,
                    location: employee?.location,
                    email_address: employee?.email_address,
                    role: employee?.role,
                    business_name: employee?.business_name,
                    id: employee?.id,
                });
            }
        } else {
            res.json({
                title: "error",
                message: "Ju lutem mbushni rubrikat"
            })
        }
    } catch (error) {
        console.error("Database query error:", error);
        res.status(500).json({message: "An error occurred"});
    }
});

app.post("/loginbyemail", async (req, res) => {
    try {
        const {email_address, password} = req.body;

        if (email_address) {
            const employee = await users_table.findOne({
                where: {email_address: email_address},
            });

            if (!employee || !bcrypt.compareSync(password, employee?.password)) {
                return res.json({
                    title: "error",
                    message: "Numri apo fjalëkalimi është gabim",
                });
            }


            if (employee?.role === "admin") {
                const adminToken = jwt.sign(
                    {email_address: employee?.email_address, role: "admin"},
                    secretKey,
                    {
                        expiresIn: "1h",
                    }
                );
                res.cookie("adminToken", adminToken, {httpOnly: true});
                res.json({
                    title: "success",
                    message: "Kyçja u bë me sukses",
                    adminToken: adminToken,
                    phone_number: employee?.phone_number,
                    business_name: employee?.business_name,
                    name_surname: employee?.name_surname,
                    location: employee?.location,
                    email_address: employee?.email_address,
                    role: employee?.role,
                    id: employee?.id
                });
            } else if (employee?.role === "employee") {
                const employeeToken = jwt.sign(
                    {email_address: employee?.email_address, role: "employee"},
                    secretKey
                );
                res.cookie("employee", employeeToken, {httpOnly: true});
                res.json({
                    title: "success",
                    message: "Kyçja u bë me sukses",
                    employeeToken: employeeToken,
                    phone_number: employee?.phone_number,
                    name_surname: employee?.name_surname,
                    location: employee?.location,
                    email_address: employee?.email_address,
                    role: employee?.role,
                    business_name: employee?.business_name,
                    id: employee?.id,
                });
            }
        } else {
            res.json({
                title: "error",
                message: "Ju lutem mbushni rubrikat"
            })
        }
    } catch (error) {
        console.error("Database query error:", error);
        res.status(500).json({message: "An error occurred"});
    }
});

app.get('/employees', async (req, res) => {
    const employees = await users_table.findAll({
        where: {role: 'employee'}
    });
    res.json(employees);
})


app.post(`/deleteemployee:employee_id`, async (req, res) => {
    const {employee_id} = req.params;
    try {
        const employeeToDelete = await users_table.findOne({
            where: {id: employee_id}
        })
        console.log(employeeToDelete)
        await employeeToDelete.destroy();
        res.json({
            title: "success",
            message: "Employee Deleted Successful"
        })
    } catch (e) {
        console.log(e)
        res.json({
            title: "error",
            message: "Something went wrong"
        })
    }
})

app.post('/createcase', async (req, res) => {
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
            progress: 'request',
            qr_code: null // initially set to null
        });

        const qrCodeData = await QRCode.toDataURL(newCase.id.toString());

        await newCase.update({qr_code: qrCodeData});

        res.json({
            title: 'Success',
            message: 'Kërkesa u përfundua me sukses',
        });
    } catch (e) {
        console.log(e);
        res.json({
            title: "Error",
            message: "Kërkesa nuk mund të realizohet"
        });
    }
});

app.get(`/allcases`, async (req, res) => {
    try {
        const cases_array = await cases_table.findAll()
        res.send(cases_array);
    } catch (e) {
        console.log(e)
        res.json({
            title: "error",
            message: "Diçka nuk shkoi në rregull"
        })
    }
})

app.get(`/cases:client_id`, async (req, res) => {
    const {client_id} = req.params;
    try {
        const cases_array = await cases_table.findAll({
            where: {sender_id: client_id}
        })
        res.send(cases_array);
    } catch (e) {
        console.log(e)
        res.json({
            title: "error",
            message: "Diçka nuk shkoi në rregull"
        })
    }
})

app.post(`/cancelcase:case_id`, async (req, res) => {
    const {case_id} = req.params;
    try {
        const caseToCancel = await cases_table.findOne({
            where: {id: case_id}
        })
        caseToCancel.progress = "cancelled"
        await caseToCancel.save();
        res.json({
            title: "success",
            message: "Case u anulua me sukses"
        })
    } catch (e) {
        console.log(e)
        res.json({
            title: "error",
            message: "Kërkesa nuk mund të realizohet"
        })
    }
})

app.post(`/deletecase:case_id`, async (req, res) => {
    const {case_id} = req.params;
    try {
        const caseToDelete = await cases_table.findOne({
            where: {id: case_id}
        })
        await caseToDelete.destroy();
        res.json({
            title: "success",
            message: "Case u fshi me sukses"
        })
    } catch (e) {
        console.log(e)
        res.json({
            title: "error",
            message: "Kërkesa nuk mund të realizohet"
        })
    }
})

app.get("/employees/:employee_id/cases/:case_id", async (req, res) => {
    const {employee_id, case_id} = req.params;
    try {
        const caseData = await cases_table.findOne({
            where: {
                id: case_id,
                sender_id: employee_id
            }
        });

        if (caseData) {
            res.json({
                title: "success",
                message: "U krye me sukeses",
                case: caseData
            });
        } else {
            res.json({
                title: "error",
                message: "Case nuk mund të gjendet"
            });
        }
    } catch (error) {
        console.error("Error fetching case details:", error);
        res.json({
            title: "error",
            message: "Kërkesa nuk mund të realizohet"
        });
    }
});

app.get("/case:case_id", async (req, res) => {
    const {case_id} = req.params;
    try {
        const caseData = await cases_table.findOne({
            where: {
                id: case_id,
            }
        });

        if (caseData) {
            res.json({
                title: "success",
                message: "U krye me sukeses",
                case: caseData
            });
        } else {
            res.json({
                title: "error",
                message: "Case nuk mund të gjendet"
            });
        }
    } catch (error) {
        console.error("Error fetching case details:", error);
        res.json({
            title: "error",
            message: "Kërkesa nuk mund të realizohet"
        });
    }
});

app.post("/generatepdfonly/:case_id", async (req, res) => {
    const {case_id} = req.params;
    const caseData = await cases_table.findByPk(case_id);

    try {
        await createInvoice(case_id, caseData, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            title: "error",
            message: "Diçka nuk shkoi mirë me kërkesën",
        });
    }
});

db.sequelize.sync().then((req) => {
    app.listen(port, () => {
        console.log(`Server is running successfully`);
    });
});
  