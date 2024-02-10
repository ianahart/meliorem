package com.hart.meliorem.bookmark;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hart.meliorem.bookmark.dto.BookMarkFullDto;

@Repository
public interface BookMarkRepository extends JpaRepository<BookMark, Long> {

    @Query(value = """
            SELECT EXISTS(SELECT 1 FROM BookMark b
            INNER JOIN b.user u
            INNER JOIN b.studySet s
            WHERE u.id = :userId
            AND s.id = :studySetId
            )
            """)
    boolean findBookMarkByUserIdAndStudySetId(@Param("userId") Long userId, @Param("studySetId") Long studySetId);

    @Query(value = """
            SELECT new com.hart.meliorem.bookmark.dto.BookMarkFullDto(
             u.id AS userId, ss.id AS id,
             ss.createdAt AS createdAt, ss.course AS course, ss.description AS description,
             ss.folder AS folder, ss.schoolName AS schoolName, ss.title AS title,
             ss.visibility AS visibility, ss.id AS studySetId
            ) FROM BookMark b
            INNER JOIN b.studySet ss
            INNER JOIN b.user u
            WHERE u.id = :userId
            """)
    Page<BookMarkFullDto> findAllBookMarksByUserId(@Param("userId") Long userId, @Param("pageable") Pageable pageable);

}
