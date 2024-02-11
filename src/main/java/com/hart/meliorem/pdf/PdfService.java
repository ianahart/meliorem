package com.hart.meliorem.pdf;

import com.hart.meliorem.advice.BadRequestException;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;

import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class PdfService {

    public File convertMultipartFileToFile(MultipartFile file) throws IOException {
        try {
            File convFile = new File(file.getOriginalFilename());
            FileOutputStream fileOutputStream = new FileOutputStream(convFile);

            fileOutputStream.write(file.getBytes());
            fileOutputStream.close();

            return convFile;

        } catch (IOException e) {
            throw new BadRequestException("File not found creating pdf");
        }

    }

    public Document convertToPdf(MultipartFile file) throws IOException, DocumentException {
        File convertedFile = convertMultipartFileToFile(file);
        InputStream docxInputStream = new FileInputStream(convertedFile);
        try (XWPFDocument document = new XWPFDocument(docxInputStream);
                OutputStream pdfOutputStream = new FileOutputStream("output.pdf");) {
            Document pdfDocument = new Document();
            PdfWriter.getInstance(pdfDocument, pdfOutputStream);
            pdfDocument.open();

            List<XWPFParagraph> paragraphs = document.getParagraphs();
            for (XWPFParagraph paragraph : paragraphs) {
                pdfDocument.add(new Paragraph(paragraph.getText()));
            }
            pdfDocument.close();
            convertedFile.delete();
            return pdfDocument;
        }
    }
}
