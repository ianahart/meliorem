package com.hart.meliorem.bookprogress;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hart.meliorem.bookprogress.dto.BookProgressDto;
import com.hart.meliorem.bookprogress.dto.FullBookProgressDto;

@Repository
public interface BookProgressRepository extends JpaRepository<BookProgress, Long> {

    @Query(value = """
            SELECT new com.hart.meliorem.bookprogress.dto.FullBookProgressDto(
             u.id AS userId, b.id AS bookId, bp.id AS id, bp.currentPage AS currentPage,
             bp.totalPages AS totalPages, bp.notes AS notes, bp.isCompleted AS isCompleted,
             b.imageUrl AS imageUrl
            ) FROM BookProgress bp
            INNER JOIN bp.user u
            INNER JOIN bp.book b
            WHERE u.id = :userId
            """)

    Page<FullBookProgressDto> getBookProgressesByUserId(@Param("userId") Long userId,
            @Param("pageable") Pageable pageable);

    @Query(value = """
            SELECT new com.hart.meliorem.bookprogress.dto.BookProgressDto(
             u.id AS userId, b.id AS bookId, bp.id AS id, bp.currentPage AS currentPage,
             bp.totalPages AS totalPages, bp.notes AS notes, bp.isCompleted AS isCompleted
            ) FROM BookProgress bp
            INNER JOIN bp.user u
            INNER JOIN bp.book b
            WHERE u.id = :userId
            AND b.id = :bookId
            """)

    List<BookProgressDto> getBookProgressByUserIdAndBookId(@Param("userId") Long userId, @Param("bookId") Long bookId);

}
