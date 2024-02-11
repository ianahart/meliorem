package com.hart.meliorem.note;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.hart.meliorem.note.dto.NoteDto;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {

    @Modifying
    @Transactional
    @Query("DELETE FROM Note n WHERE n.id = :id")
    void deleteNote(@Param("id") Long id);

    @Query(value = """
                SELECT new com.hart.meliorem.note.dto.NoteDto(
                n.url AS url
                ) FROM Note n
                INNER JOIN n.studySet ss
                WHERE ss.id = :studySetId
            """)

    NoteDto getNoteUrlByStudySetId(@Param("studySetId") Long studySetId);
}
