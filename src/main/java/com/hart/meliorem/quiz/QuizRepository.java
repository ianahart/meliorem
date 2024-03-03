package com.hart.meliorem.quiz;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hart.meliorem.quiz.dto.QuizDto;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {

    @Query(value = """
            SELECT new com.hart.meliorem.quiz.dto.QuizDto(
              q.id AS id, u.id AS userId, q.createdAt AS createdAt,
              q.category AS category, q.correctAnswers AS correctAnswers,
              q.incorrectAnswers AS incorrectAnswers
            ) FROM Quiz q
            INNER JOIN q.user u
            WHERE u.id = :userId
                """)
    Page<QuizDto> getQuizzesByUserId(@Param("userId") Long userId, @Param("pageable") Pageable pageable);
}
