package com.hart.meliorem.pdf;

import com.hart.meliorem.advice.BadRequestException;
import com.hart.meliorem.advice.RedirectException;

import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;

import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class PdfService {

    @Autowired
    public PdfService() {

    }

    public InputStream proxyPdf(String pdfUrl) {

        try {
            URL url = new URL(pdfUrl);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");

            return connection.getInputStream();

        } catch (IOException e) {
            System.out.println("Error fetching PDF: " + e.getMessage());
            return null;
        }

    }

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

    public File convertToPdf(MultipartFile file) throws IOException, java.io.IOException {
        File convertedFile = convertMultipartFileToFile(file);
        try (InputStream docxInputStream = new FileInputStream(convertedFile);
                XWPFDocument document = new XWPFDocument(docxInputStream);
                OutputStream pdfOutputStream = new FileOutputStream("output.pdf")) {
            PdfWriter pdfWriter = new PdfWriter(pdfOutputStream);
            PdfDocument pdfDocument = new PdfDocument(pdfWriter);
            Document pdfLayout = new Document(pdfDocument);

            List<XWPFParagraph> paragraphs = document.getParagraphs();
            for (XWPFParagraph paragraph : paragraphs) {
                pdfLayout.add(new Paragraph(paragraph.getText()));
            }

            pdfLayout.close();
            pdfDocument.close();
            convertedFile.delete();

            return new File("output.pdf");
        }
    }
}
