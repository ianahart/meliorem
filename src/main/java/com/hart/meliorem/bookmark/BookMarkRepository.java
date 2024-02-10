package com.hart.meliorem.bookmark;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

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

}
