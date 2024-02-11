package com.hart.meliorem.note.request;

import org.springframework.web.multipart.MultipartFile;

public class CreateNoteRequest {

    private MultipartFile file;

    private Long studySetId;

    public CreateNoteRequest() {

    }

    public CreateNoteRequest(MultipartFile file, Long studySetId) {
        this.file = file;
        this.studySetId = studySetId;
    }

    public Long getStudySetId() {
        return studySetId;
    }

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }

    public void setStudySetId(Long studySetId) {
        this.studySetId = studySetId;
    }
}
