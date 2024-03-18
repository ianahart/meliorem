package com.hart.meliorem.book;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URI;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.hart.meliorem.book.dto.BookDto;
import com.hart.meliorem.book.request.CreateBookRequest;
import com.hart.meliorem.pagination.PaginationService;
import com.hart.meliorem.pagination.dto.PaginationDto;
import com.hart.meliorem.pdf.PdfService;
import com.hart.meliorem.user.Role;
import com.hart.meliorem.user.User;
import com.hart.meliorem.user.UserService;
import com.hart.meliorem.advice.ForbiddenException;
import com.hart.meliorem.advice.NotFoundException;

@Service
public class BookService {

    private final PdfService pdfService;

    private final PaginationService paginationService;

    private final BookRepository bookRepository;

    private final UserService userService;

    @Autowired
    BookService(
            PdfService pdfService,
            PaginationService paginationService,
            BookRepository bookRepository,
            UserService userService) {
        this.pdfService = pdfService;
        this.paginationService = paginationService;
        this.bookRepository = bookRepository;
        this.userService = userService;
    }

    public InputStream proxyPdf(Long bookId) {
        Book book = getBookById(bookId);

        return this.pdfService.proxyPdf(book.getPdfUrl());
    }

    public void makeRequestToGutendex(CreateBookRequest request) throws IOException {
        User currentUser = this.userService.getCurrentlyLoggedInUser();

        try {
            if (!currentUser.getRole().equals(Role.ADMIN)) {
                throw new ForbiddenException("You must be an admin to create books");
            }

            String url = "https://gutendex.com/books?copyright=false&search=" + request.getTitle() + "&topic="
                    + request.getTopic();
            HttpURLConnection connection = (HttpURLConnection) URI.create(url).toURL().openConnection();

            connection.setRequestMethod("GET");

            int responseCode = connection.getResponseCode();

            if (responseCode == HttpURLConnection.HTTP_OK) {
                BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                StringBuffer jsonResponseData = new StringBuffer();
                String readLine = null;
                while ((readLine = in.readLine()) != null) {
                    jsonResponseData.append(readLine);
                }

                in.close();
                createBook(jsonResponseData.toString(), currentUser);
            }

        } catch (IOException e) {
            System.out.println(e.getMessage());
        }
    }

    private void createBook(String jsonData, User user) {
        JSONObject obj = new JSONObject(jsonData);
        JSONArray arr = obj.getJSONArray("results");

        try {
            for (int i = 0; i < arr.length(); i++) {
                JSONObject book = arr.getJSONObject(i);
                String title = book.get("title").toString();
                String author = book.getJSONArray("authors").getJSONObject(0).get("name").toString();
                String bookshelf = book.getJSONArray("bookshelves").length() > 0
                        ? book.getJSONArray("bookshelves").getString(0)
                        : "";
                String pdfUrl = book.getJSONObject("formats").has("application/pdf")
                        ? book.getJSONObject("formats").get("application/pdf").toString()
                        : "";
                String imageUrl = book.getJSONObject("formats").has("image/jpeg")
                        ? book.getJSONObject("formats").get("image/jpeg").toString()
                        : "";

                Integer downloadCount = (Integer) book.get("download_count");

                Book newBook = new Book(title, author, bookshelf, pdfUrl, imageUrl, downloadCount, user);
                this.bookRepository.save(newBook);

            }

        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    public PaginationDto<BookDto> getBooks(int page, int pageSize, String direction) {
        Pageable pageable = this.paginationService.getPageable(page, pageSize, direction);
        Page<BookDto> result = this.bookRepository.getAllBooks(pageable);

        return new PaginationDto<BookDto>(
                result.getContent(),
                result.getNumber(),
                pageSize,
                result.getTotalPages(),
                direction,
                result.getTotalElements());

    }

    public BookDto getBook(Long bookId) {
        return this.bookRepository.getBook(bookId);
    }

    public Book getBookById(Long bookId) {
        return this.bookRepository.findById(bookId)
                .orElseThrow(() -> new NotFoundException(String.format("Book was not found with the id %d", bookId)));
    }

    public void deleteBook(Long bookId) {

        Book book = getBookById(bookId);

        this.bookRepository.delete(book);

    }

    private static class RedirectException extends RuntimeException {
        private final String redirectUrl;

        public RedirectException(String redirectUrl) {
            this.redirectUrl = redirectUrl;
        }
    }
}
