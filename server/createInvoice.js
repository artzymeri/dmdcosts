const fs = require("fs");
const PDFDocument = require("pdfkit");

function generateImage(doc, x, y, width, height, path) {
  doc.image(path, x, y, { width: width, height: height });
}

function generateLine(doc, x1, y1, x2, y2) {
  doc
    .strokeColor("#a8d08d")
    .lineWidth(0.5)
    .moveTo(x1, y1)
    .lineTo(x2, y2)
    .stroke();
}

function generateBackground(doc, x, y, width, height, color) {
  doc.fillColor(color).rect(x, y, width, height).fill();
}

function generateTable(doc, cases_array) {
  generateLine(doc, 115, 405, 495, 405); // top
  generateLine(doc, 115, 405, 115, 420); // left
  generateLine(doc, 145, 405, 145, 420); // left 1 - reference
  generateLine(doc, 370, 405, 370, 420); // left 2 - type of work
  generateLine(doc, 450, 405, 450, 420); // left 3 - rate
  generateLine(doc, 495, 405, 495, 420); // right
  generateLine(doc, 115, 420, 495, 420); // bottom
  doc
    .fillColor("#000000")
    .fontSize(10)
    .font("Helvetica-Bold")
    .text(`Reference`, 150, 409);
  doc
    .fillColor("#000000")
    .fontSize(10)
    .font("Helvetica-Bold")
    .text(`Type of Work`, 375, 409);
  doc
    .fillColor("#000000")
    .fontSize(10)
    .font("Helvetica-Bold")
    .text(`Rate`, 455, 409);

  let number = 0;
  let index = 0;
  let totalRate = 0;

  for (row of cases_array) {
    number += 15;
    index += 1;
    totalRate += parseInt(row.rate_per_hour);
    if (index % 2 !== 0) {
      // Checks if index is odd
      generateBackground(doc, 115, 405 + number, 380, 15, "#e2efd9");
    }
    generateLine(doc, 115, 405 + number, 495, 405 + number); // top
    generateLine(doc, 115, 405 + number, 115, 420 + number); // left
    generateLine(doc, 145, 405 + number, 145, 420 + number); // left 1 - reference
    generateLine(doc, 370, 405 + number, 370, 420 + number); // left 2 - type of work
    generateLine(doc, 450, 405 + number, 450, 420 + number); // left 3 - rate
    generateLine(doc, 495, 405 + number, 495, 420 + number); // right
    doc
      .fillColor("#000000")
      .fontSize(10)
      .font("Helvetica-Bold")
      .text(`${index}.`, 120, 409 + number);
    doc
      .fillColor("#000000")
      .fontSize(10)
      .font("Helvetica")
      .text(
        `${row?.claimant_name} - ${row?.client_reference_number}`,
        150,
        409 + number
      );
    doc
      .fillColor("#000000")
      .fontSize(10)
      .font("Helvetica")
      .text(`Bill of Costs`, 375, 409 + number);
    doc
      .fillColor("#000000")
      .fontSize(10)
      .font("Helvetica")
      .text(`£${row?.rate_per_hour}`, 455, 409 + number);

    if (index == cases_array.length) {
      if (index % 2 === 0) {
        generateBackground(doc, 115, 405 + number + 15, 380, 25, "#e2efd9");
      }
      generateLine(doc, 115, 405 + number + 15, 495, 405 + number + 15); // top
      generateLine(doc, 115, 405 + number + 15, 115, 420 + number + 25); // left
      generateLine(doc, 145, 405 + number + 15, 145, 420 + number + 25); // left 1 - reference
      generateLine(doc, 370, 405 + number + 15, 370, 420 + number + 25); // left 2 - type of work
      generateLine(doc, 450, 405 + number + 15, 450, 420 + number + 25); // left 3 - rate
      generateLine(doc, 495, 405 + number + 15, 495, 420 + number + 25); // right
      generateLine(doc, 115, 420 + number + 25, 495, 420 + number + 25); // bottom
      doc
        .fillColor("#000000")
        .fontSize(10)
        .font("Helvetica")
        .text(`Total:`, 375, 409 + number + 15);
      doc
        .fillColor("#000000")
        .fontSize(10)
        .font("Helvetica-Bold")
        .text(`£${totalRate}`, 455, 409 + number + 15);
    }
  }
}

function generateHeader(doc) {
  generateImage(doc, 0, -40, 900, 220, "./decoration.png");
  generateImage(doc, 0, 705, 900, 200, "./decoration.png");
  generateImage(doc, 77, 71, 105, 105, "./dmd_logo.png");

  doc
    .fillColor("#000")
    .fontSize(10)
    .font("Helvetica-Bold") // Bold for T:
    .text(`T: `, 380, 85, { continued: true })
    .font("Helvetica") // Normal for phone numbers
    .text(`07503992804 / 07724108587`, { continued: false })

    .font("Helvetica-Bold") // Bold for E:
    .text(`E: `, 415, 100, { continued: true })
    .font("Helvetica") // Switch to normal for email
    .fillColor("blue") // Blue color for email
    .text(`info@dmdcosts.co.uk`, {
      underline: true, // Underline only this part
      link: "mailto:info@dmdcosts.co.uk", // Clickable email
      continued: false,
    })

    .font("Helvetica-Bold") // Bold for W:
    .fillColor("#000") // Reset to black
    .text(`W: `, 408, 115, { continued: true })
    .font("Helvetica") // Switch to normal for website
    .fillColor("blue") // Blue color for website
    .text(`https://dmdcosts.co.uk`, {
      underline: true, // Underline only this part
      link: "https://dmdcosts.co.uk", // Clickable website
      continued: false,
    })

    .font("Helvetica-Bold") // Bold for A:
    .fillColor("#000") // Reset to black
    .text(`A: `, 388, 130, { continued: true })
    .font("Helvetica") // Normal for address
    .text(`Bolton, Greater Manchester`)
    .moveDown();
}

function generateClientInformation(doc, client_obj, invoice_obj) {
  const client = client_obj.dataValues;

  const createdAt = new Date(invoice_obj?.createdAt);
  const formattedDate = createdAt.toLocaleDateString("en-GB");

  doc
    .fillColor("#000000")
    .fontSize(10)
    .text(`${client?.business_name}`, 70, 220)
    .text(`${client?.address1}`, 70, 235)
    .text(client?.address2, 70, 250)
    .text(client?.address3, 70, 265)
    .text(client?.city, 70, 280)
    .text(client?.post_code, 70, 295)
    .text(formattedDate, 490, 300)
    .moveDown();
}

function generateTableHeader(doc, y1, y2, y3, c1, c2, c3) {
  doc
    .fontSize(10)
    .text(c1, 70, y1)
    .font("Helvetica-Bold")
    .text(c2, 70, y2)
    .font("Helvetica")
    .text(c3, 70, y3);
}

function generateBankDetails(doc, y1, y2, y3, y4, c1, v1, v2, v3) {
  doc
    .fontSize(10)
    .font("Helvetica")
    .text(c1, 70, y1) // Bank Details
    .text("Account Holder: ", 70, y2, { continued: true })
    .font("Helvetica-Bold")
    .text(v1) // Use the value directly
    .font("Helvetica")
    .text("Account Number: ", 70, y3, { continued: true })
    .font("Helvetica-Bold")
    .text(v2) // Use the value directly
    .font("Helvetica")
    .text("Sort Code: ", 70, y4, { continued: true })
    .font("Helvetica-Bold")
    .text(v3); // Use the value directly
}

function generateFooterDisclaimer(doc) {
  doc
    .font("Helvetica")
    .fontSize(7)
    .text("DMD Costs Limited. Company registered in ", 150, 750, {
      continued: true,
    })
    .text("England and Wales, ", { continued: true })
    .text("Company number: ", { continued: true })
    .font("Helvetica-Bold") // Switch to bold font
    .text("15719279", { continued: false }) // Bold text
    .font("Helvetica"); // Switch back to normal font (if more text follows)
}

function createInvoice(invoice_object, admin, client, res) {
  const bankDetails = JSON.parse(admin.dataValues?.bank_details);

  return new Promise((resolve, reject) => {
    let doc = new PDFDocument({ margin: 30 });

    generateHeader(doc);
    generateClientInformation(doc, client, invoice_object);
    generateTableHeader(
      doc,
      335,
      360,
      385,
      "Dear Sirs",
      "Consultant Invoice",
      "Work Done:"
    );
    generateTable(doc, invoice_object.cases_data);
    generateBankDetails(
      doc,
      620,
      635,
      650,
      665,
      "Bank Details:",
      bankDetails?.account_holder,
      bankDetails?.account_number,
      bankDetails?.sort_code
    );
    generateFooterDisclaimer(doc);

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
