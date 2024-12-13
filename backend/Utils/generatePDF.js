import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";

// Define __dirname for ES Modules
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generatePDF = (requestId, userName, address, phoneNumber) => {
    const pdfDir = path.join(__dirname, "../pdfs");

    console.log("PDF directory path:", pdfDir);

    // Ensure the "pdfs" directory exists
    if (!fs.existsSync(pdfDir)) {
        fs.mkdirSync(pdfDir, { recursive: true });
    }

    const pdfPath = path.join(pdfDir, `${requestId}.pdf`);
    const doc = new PDFDocument();

    // Pipe the PDF into a write stream
    const writeStream = fs.createWriteStream(pdfPath);
    doc.pipe(writeStream);

    // Add content to the PDF
    doc.fontSize(16).text("Mailing Slip", { align: "center" });
    doc.moveDown();
    doc.text("To: Brooklyn College");
    doc.text("Department of Earth and Environmental Sciences");
    doc.text("Environmental Sciences Analytical Center");
    doc.text("2900 Bedford Avenue");
    doc.text("Brooklyn, NY 11210");
    doc.text("Number: (718) 951-5000 x 2647");
    doc.moveDown();
    doc.text(`From: ${userName}`);
    doc.text(`${address}`);
    doc.text(`${phoneNumber}`);
    doc.moveDown();
    doc.text(`Sample ID: ${requestId}`);
    doc.text("Sample Type: Agricultural Soil");
    doc.text("Instructions: Handle with Care");

    // Finalize the PDF
    doc.end();
    writeStream.on("finish", () => console.log("File written successfully!"));

    // Return a promise to ensure the file is saved
    return new Promise((resolve, reject) => {
        writeStream.on("finish", () => resolve(pdfPath));
        writeStream.on("error", reject);
    });
};

export default generatePDF;
