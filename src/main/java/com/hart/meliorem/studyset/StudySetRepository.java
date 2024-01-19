package com.hart.meliorem.studyset;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StudySetRepository extends JpaRepository<StudySet, Long> {
    @Query(value = """
            SELECT DISTINCT ss.folder FROM StudySet ss
                 INNER JOIN ss.user u
                 WHERE u.id = :userId
                 AND LOWER(ss.folder) LIKE %:query%
                """)
    Page<String> findAllDistinctFoldersByUserId(@Param("userId") Long userId, @Param("query") String query,
            @Param("pageable") Pageable pageable);
}
