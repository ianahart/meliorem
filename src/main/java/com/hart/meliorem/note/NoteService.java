package com.hart.meliorem.note;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import com.hart.meliorem.advice.ForbiddenException;
import com.hart.meliorem.advice.NotFoundException;

import com.hart.meliorem.amazon.AmazonService;
import com.hart.meliorem.pdf.PdfService;
import com.hart.meliorem.studyset.StudySet;
import com.hart.meliorem.studyset.StudySetService;
import com.hart.meliorem.user.User;
import com.hart.meliorem.user.UserService;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;

@Service
public class NoteService {

    private final NoteRepository noteRepository;

    private final UserService userService;

    private final StudySetService studySetService;

    private final AmazonService amazonService;

    private final PdfService pdfService;

    @Autowired
    public NoteService(
            NoteRepository noteRepository,
            UserService userService,
            StudySetService studySetService,
            AmazonService amazonService,
            PdfService pdfService) {
        this.noteRepository = noteRepository;
        this.userService = userService;
        this.studySetService = studySetService;
        this.amazonService = amazonService;
        this.pdfService = pdfService;
    }

    public Note getNoteById(Long noteId) {
        return this.noteRepository
                .findById(noteId)
                .orElseThrow(() -> new NotFoundException("Not was not found with the id " + noteId));
    }

    @Transactional
    private void checkForExistingNote(StudySet studySet) {
        List<Note> notes = studySet.getNotes();
        if (notes.size() == 1) {
            this.amazonService.deleteBucketObject("arrow-date", notes.getFirst().getFilename());
            this.noteRepository.deleteNote(notes.getFirst().getId());
        }

    }

    public String createNote(MultipartFile file, Long studySetId) throws IOException, DocumentException {
        try {

            StudySet studySet = this.studySetService.findStudySetById(studySetId);

            checkForExistingNote(studySet);

            User user = this.userService.getCurrentlyLoggedInUser();

            if (user.getId() != studySet.getUser().getId()) {
                throw new ForbiddenException("Cannot upload notes to which the studyset is not yours");
            }

            Document document = this.pdfService.convertToPdf(file);

            HashMap<String, String> contents = this.amazonService.putS3Pdf("arrow-date", "output.pdf", document);
            String url = contents.get("objectUrl");
            String filename = contents.get("filename");

            Note note = new Note(filename, url, user, studySet);

            this.noteRepository.save(note);

            return note.getUrl();

        } catch (IOException | DocumentException e) {
            System.out.println(e.getMessage());
            System.out.println("Something went wrong creating note");
            return "";
        }
    }

    public String getNotes(Long studySetId) {
        return this.noteRepository.getNoteUrlByStudySetId(studySetId).getUrl();
    }
}
