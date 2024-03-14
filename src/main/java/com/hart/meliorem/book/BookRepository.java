package com.hart.meliorem.book;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hart.meliorem.book.dto.BookDto;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    @Query(value = """
              SELECT new com.hart.meliorem.book.dto.BookDto(
               b.id AS id, b.title AS title, b.author AS author, b.bookshelf AS bookshelf,
               b.pdfUrl AS pdfUrl, b.imageUrl AS imageUrl, b.downloadCount AS downloadCount
              ) FROM Book b
              WHERE b.id = :bookId
            """)
    BookDto getBook(@Param("bookId") Long bookId);

    @Query(value = """
              SELECT new com.hart.meliorem.book.dto.BookDto(
               b.id AS id, b.title AS title, b.author AS author, b.bookshelf AS bookshelf,
               b.pdfUrl AS pdfUrl, b.imageUrl AS imageUrl, b.downloadCount AS downloadCount
              ) FROM Book b
            """)
    Page<BookDto> getAllBooks(@Param("pageable") Pageable pageable);
}
