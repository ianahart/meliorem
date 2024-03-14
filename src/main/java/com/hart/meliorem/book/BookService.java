package com.hart.meliorem.book;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import org.springframework.web.reactive.function.client.WebClient;

import com.hart.meliorem.book.dto.BookDto;
import com.hart.meliorem.book.request.CreateBookRequest;
import com.hart.meliorem.pagination.PaginationService;
import com.hart.meliorem.pagination.dto.PaginationDto;
import com.hart.meliorem.user.Role;
import com.hart.meliorem.user.User;
import com.hart.meliorem.user.UserService;
import com.hart.meliorem.advice.ForbiddenException;
import com.hart.meliorem.advice.NotFoundException;

import reactor.core.publisher.Mono;

@Service
public class BookService {

    private final PaginationService paginationService;

    private final BookRepository bookRepository;

    private final UserService userService;

    private final WebClient webClient;

    @Autowired
    BookService(
            PaginationService paginationService,
            BookRepository bookRepository,
            UserService userService,
            WebClient.Builder webClientBuilder) {
        this.paginationService = paginationService;
        this.bookRepository = bookRepository;
        this.userService = userService;
        this.webClient = webClientBuilder.baseUrl("https://gutendex.com")
                .filter(ExchangeFilterFunction.ofResponseProcessor(clientResponse -> {
                    if (clientResponse.statusCode().is3xxRedirection()) {
                        String redirectUrl = clientResponse.headers().asHttpHeaders().getLocation().toString();
                        return Mono.error(new RedirectException(redirectUrl));
                    }
                    return Mono.just(clientResponse);
                }))
                .build();
    }

    public void makeRequestToGutendex(CreateBookRequest request) {
        User currentUser = this.userService.getCurrentlyLoggedInUser();

        if (!currentUser.getRole().equals(Role.ADMIN)) {
            throw new ForbiddenException("You must be an admin to create books");
        }

        String response;
        try {
            response = this.webClient.get()
                    .uri("/books?copyright=false&search=" + request.getTitle() + "&topic=" + request.getTopic())
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
        } catch (RedirectException e) {
            String redirectUrl = e.redirectUrl;
            response = this.webClient.get().uri(redirectUrl)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
            createBook(response, currentUser);
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
