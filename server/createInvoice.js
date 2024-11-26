const fs = require("fs");
const PDFDocument = require("pdfkit");

function generateHr(doc, y) {
    doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(560, y).stroke();
}

function generateHr2(doc, y) {
    doc.strokeColor("#aaaaaa").lineWidth(5).moveTo(50, y).lineTo(560, y).stroke();
}

function generateBackground(doc, x, y, width, height, color) {
    doc.fillColor(color).rect(x, y, width, height).fill();
}

function generateHeader(doc, order_object) {
    doc
        .fillColor("#444444")
        .fontSize(20)
        .text(`${order_object.sender_name_surname}`, 50, 57)
        .fontSize(10)
        .text(`${order_object.sender_business_name}`, 50, 75)
        .moveDown();

    generateHr(doc, 110);
}

function generateCustomerInformation(doc, order_object) {

    doc
        .fillColor("#000000")
        .text(`Case Numër: #${order_object.id}`, 60, 130)
        .text(`Data e porosisë: ${order_object.createdAt}`, 60, 145)
        .text(order_object.receiver_name_surname, 60, 160)
        .text(order_object.receiver_city, 60, 175)
        .text(order_object.receiver_state, 60, 190)
        .moveDown();

    generateHr(doc, 220);
}

function generateTableHeader(doc, y, c1, c2, c3, c4) {
    doc.font("Helvetica-Bold");
    doc
        .fontSize(11)
        .text(c1, 50, y)
        .text(c2, 280, y)
        .text(c3, 380, y)
        .text(c4, 480, y);

    generateHr(doc, 280);
}

function generateTableTotalPrice(doc, totalSum, y) {
    doc
        .font("Helvetica")
        .fontSize(10)
        .text("Totali i Faturës është:", 400, (y + 310))
        .fontSize(15)
        .font("Helvetica-Bold")
        .text(`${totalSum.toFixed(2)}€`, 500, (y + 307))
        .font("Helvetica")
        .fontSize(10)
        .text("Vlera e TVSH (në përqindje):", 367, (y + 335))
        .font("Helvetica")
        .fontSize(13)
        .text("15%", 500, (y + 333))
        .font("Helvetica")
        .fontSize(10)
        .text("Totali Faturës pas TVSH:", 385, (y + 360))
        .font("Helvetica-Bold")
        .fontSize(15)
        .text(`${(totalSum * 0.85).toFixed(2)}€`, 500, (y + 357));
}

function generateFooterDisclaimer(doc) {
    doc
        .font("Helvetica")
        .fontSize(9)
        .text(
            "Kjo faturë eshtë përpiluar në kuadër të softuerit/uebfaqes E-Commerce Kosova",
            50,
            730,
            { align: "center" }
        );
}

function createInvoice(orderId, order_object, res) {
    return new Promise((resolve, reject) => {
        let doc = new PDFDocument({ margin: 50 });

        generateHeader(doc, order_object);
        generateBackground(doc, 50, 110, 510, 110, "#DDDDDD");
        generateCustomerInformation(doc, order_object);

        generateTableHeader(
            doc,
            260,
            "Emri produktit",
            "Çmimi i produktit",
            "Përshkrimi i produktit",
            "Komenti"
        );

        let y = 310;
        let y1 = 330;
        let y3 = 0;
        let totalSum = 0;

            doc.font("Helvetica");
            doc
                .fontSize(10)
                .text(
                    `${order_object?.product_description}`,
                    50,
                    y
                )
                .text(
                    `${order_object?.product_price}€`,
                    280,
                    y
                )
                .text(order_object?.comment, 380, y)
                .text(order_object?.driver, 480, y);

            generateHr2(doc, y1);
            y += 50;
            y1 += 50;
            y3 += 50;
            totalSum = parseFloat(order_object?.product_price);
        generateTableTotalPrice(doc, totalSum, y3)
        generateFooterDisclaimer(doc);

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename=Fatura ${
                order_object?.id
            } ${order_object.createdAt.toLocaleDateString("en-GB")}.pdf`
        );

        doc.pipe(res);
        doc.end();

        doc.on("end", () => {
            resolve();
        });

        doc.on("error", (err) => {
            reject(err);
        });
    });
}

module.exports = {
    createInvoice,
};