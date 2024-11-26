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
    orders_table,
    transport_table,
    drivers_table,
    collectors_table
} = require("./models");

const secretKey = process.env.SECRET_KEY;


const app = express();
app.use(express.json({limit: "50mb"}));
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

const db = require("./models");

const port = 8080;

app.post("/registeruser", async (req, res) => {
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
            role: 'user'
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
            const user = await users_table.findOne({
                where: {phone_number: phone_number},
            });

            if (!user || !bcrypt.compareSync(password, user?.password)) {
                return res.json({
                    title: "error",
                    message: "Numri apo fjalëkalimi është gabim",
                });
            }


            if (user?.role === "admin") {
                const adminToken = jwt.sign(
                    {phone_number: user?.phone_number, role: "admin"},
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
                    phone_number: user?.phone_number,
                    business_name: user?.business_name,
                    name_surname: user?.name_surname,
                    location: user?.location,
                    email_address: user?.email_address,
                    role: user?.role,
                    id: user?.id
                });
            } else if (user?.role === "user") {
                const userToken = jwt.sign(
                    {phone_number: user?.phone_number, role: "user"},
                    secretKey
                );
                res.cookie("user", userToken, {httpOnly: true});
                res.json({
                    title: "success",
                    message: "Kyçja u bë me sukses",
                    userToken: userToken,
                    phone_number: user?.phone_number,
                    name_surname: user?.name_surname,
                    location: user?.location,
                    email_address: user?.email_address,
                    role: user?.role,
                    business_name: user?.business_name,
                    id: user?.id,
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
            const user = await users_table.findOne({
                where: {email_address: email_address},
            });

            if (!user || !bcrypt.compareSync(password, user?.password)) {
                return res.json({
                    title: "error",
                    message: "Numri apo fjalëkalimi është gabim",
                });
            }


            if (user?.role === "admin") {
                const adminToken = jwt.sign(
                    {email_address: user?.email_address, role: "admin"},
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
                    phone_number: user?.phone_number,
                    business_name: user?.business_name,
                    name_surname: user?.name_surname,
                    location: user?.location,
                    email_address: user?.email_address,
                    role: user?.role,
                    id: user?.id
                });
            } else if (user?.role === "user") {
                const userToken = jwt.sign(
                    {email_address: user?.email_address, role: "user"},
                    secretKey
                );
                res.cookie("user", userToken, {httpOnly: true});
                res.json({
                    title: "success",
                    message: "Kyçja u bë me sukses",
                    userToken: userToken,
                    phone_number: user?.phone_number,
                    name_surname: user?.name_surname,
                    location: user?.location,
                    email_address: user?.email_address,
                    role: user?.role,
                    business_name: user?.business_name,
                    id: user?.id,
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

app.get('/klientet', async (req, res) => {
    const klientet = await users_table.findAll({
        where: {role: 'user'}
    });
    res.json(klientet);
})

app.get('/drivers', async (req, res) => {
    const drivers = await users_table.findAll({
        where: {role: 'driver'}
    });
    res.json(drivers);
})

app.get('/collectors', async (req, res) => {
    const collectors = await users_table.findAll({
        where: {role: 'collector'}
    });
    res.json(collectors);
})


app.post(`/deleteemployee:user_id`, async (req, res) => {
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

app.post('/createorder', async (req, res) => {
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
        const newOrder = await orders_table.create({
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

        const qrCodeData = await QRCode.toDataURL(newOrder.id.toString());

        await newOrder.update({qr_code: qrCodeData});

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

app.get(`/allorders`, async (req, res) => {
    try {
        const orders_array = await orders_table.findAll()
        res.send(orders_array);
    } catch (e) {
        console.log(e)
        res.json({
            title: "error",
            message: "Diçka nuk shkoi në rregull"
        })
    }
})

app.get(`/orders:client_id`, async (req, res) => {
    const {client_id} = req.params;
    try {
        const orders_array = await orders_table.findAll({
            where: {sender_id: client_id}
        })
        res.send(orders_array);
    } catch (e) {
        console.log(e)
        res.json({
            title: "error",
            message: "Diçka nuk shkoi në rregull"
        })
    }
})

app.post(`/cancelorder:order_id`, async (req, res) => {
    const {order_id} = req.params;
    try {
        const orderToCancel = await orders_table.findOne({
            where: {id: order_id}
        })
        orderToCancel.progress = "cancelled"
        await orderToCancel.save();
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

app.post(`/deleteorder:order_id`, async (req, res) => {
    const {order_id} = req.params;
    try {
        const orderToDelete = await orders_table.findOne({
            where: {id: order_id}
        })
        await orderToDelete.destroy();
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

app.get("/users/:user_id/orders/:order_id", async (req, res) => {
    const {user_id, order_id} = req.params;
    try {
        const order = await orders_table.findOne({
            where: {
                id: order_id,
                sender_id: user_id
            }
        });

        if (order) {
            res.json({
                title: "success",
                message: "U krye me sukeses",
                order: order
            });
        } else {
            res.json({
                title: "error",
                message: "Case nuk mund të gjendet"
            });
        }
    } catch (error) {
        console.error("Error fetching order details:", error);
        res.json({
            title: "error",
            message: "Kërkesa nuk mund të realizohet"
        });
    }
});

app.get("/order:order_id", async (req, res) => {
    const {order_id} = req.params;
    try {
        const order = await orders_table.findOne({
            where: {
                id: order_id,
            }
        });

        if (order) {
            res.json({
                title: "success",
                message: "U krye me sukeses",
                order: order
            });
        } else {
            res.json({
                title: "error",
                message: "Case nuk mund të gjendet"
            });
        }
    } catch (error) {
        console.error("Error fetching order details:", error);
        res.json({
            title: "error",
            message: "Kërkesa nuk mund të realizohet"
        });
    }
});

app.post("/generatepdfonly/:order_id", async (req, res) => {
    const {order_id} = req.params;
    const order = await orders_table.findByPk(order_id);

    try {
        await createInvoice(order_id, order, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            title: "error",
            message: "Diçka nuk shkoi mirë me kërkesën",
        });
    }
});

app.post('/addtransport', async (req, res) => {
    const {model, tag, assignee, expiry_date, document} = req.body;
    try {
        await transport_table.create({
            model,
            tag,
            assignee,
            expiry_date,
            document
        });

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

app.get(`/alltransports`, async (req, res) => {
    try {
        const transport_array = await transport_table.findAll()
        res.send(transport_array);
    } catch (e) {
        console.log(e)
        res.json({
            title: "error",
            message: "Diçka nuk shkoi në rregull"
        })
    }
})


db.sequelize.sync().then((req) => {
    app.listen(port, () => {
        console.log(`Server is running successfully`);
    });
});
  