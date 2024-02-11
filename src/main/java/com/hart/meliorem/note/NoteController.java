package com.hart.meliorem.note;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hart.meliorem.note.request.CreateNoteRequest;
import com.hart.meliorem.note.response.CreateNoteResponse;
import com.hart.meliorem.note.response.GetNoteResponse;
import com.itextpdf.text.DocumentException;

@RestController
@RequestMapping("/api/v1/notes")
public class NoteController {

    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping("")
    ResponseEntity<GetNoteResponse> getNotes(@RequestParam("studySetId") Long studySetId) {

        return ResponseEntity.status(HttpStatus.OK)
                .body(new GetNoteResponse("success", this.noteService.getNotes(studySetId)));
    }

    @PostMapping("")
    ResponseEntity<CreateNoteResponse> createNote(CreateNoteRequest request) throws IOException, DocumentException {

        try {

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(new CreateNoteResponse("success",
                            this.noteService.createNote(request.getFile(), request.getStudySetId())));

        } catch (IOException | DocumentException e) {
            System.out.println("Trouble creating note in controller");
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new CreateNoteResponse("error",
                            this.noteService.createNote(request.getFile(), request.getStudySetId())));

        }
    }
}
