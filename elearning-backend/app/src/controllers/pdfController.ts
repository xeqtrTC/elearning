import { readFileSync, writeFileSync } from "fs";
import { PDFDocument, rgb } from "pdf-lib";
import { join } from "path";
import { sendEmailWithPDF } from "../nodemailer/emailSender";

export const getPdf = async ({nameOfUser, nameOfCourse, emailOfUser}: {
    nameOfUser: string,
    nameOfCourse: string,
    emailOfUser: string
}) => {
    const pathJoin = join(__dirname, '../../pdf/png2pdf.pdf')
    const pathOfFolder = join(__dirname, '../../pdf')
    const templateBytes = readFileSync(pathJoin)
    const loadPdf = await PDFDocument.load(templateBytes)
    const pages = loadPdf.getPage(0);
    const color = rgb(1, 1, 1);
    const font = await loadPdf.embedFont('Helvetica');

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
        
    const textWidthUser = font.widthOfTextAtSize(nameOfUser, 12);
    const textWidthCourse = font.widthOfTextAtSize(`${nameOfCourse} course completion`, 12)
    const textWidthDate = font.widthOfTextAtSize(formattedDate, 12)

    const centerXUser = (pages.getWidth() - textWidthUser) / 2.16;
    const centerXCourse = (pages.getWidth() - textWidthCourse) / 2.16;
    const centerXDate = (pages.getWidth() - textWidthDate) / 2.2;

    pages.drawText(nameOfUser, {
        x: centerXUser,
        y: 330,
        color: color,
        size: textWidthUser,
        font: font
    })
    
    pages.drawText(nameOfCourse, {
        x: centerXCourse,
        y: 260,
        color: color,
        font: font
    })
    pages.drawText(formattedDate, {
        x: centerXDate,
        y: 203,
        color: color,
        font: font
    })

    const modifed = await loadPdf.save();
    const pathAndNameOfPdf = `${pathOfFolder}/${nameOfUser}.${nameOfCourse}`
    writeFileSync(`${pathAndNameOfPdf}.pdf`, modifed)
    sendEmailWithPDF({
        nameOfCourse: nameOfCourse, 
        emailOfUser: emailOfUser, 
        pdf: pathAndNameOfPdf, 
        pdfName: `${nameOfUser}.${nameOfCourse}.pdf`
    })
}

