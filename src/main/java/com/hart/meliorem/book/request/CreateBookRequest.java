package com.hart.meliorem.book.request;

public class CreateBookRequest {

    private Long userId;

    private String topic;

    private String title;

    public CreateBookRequest() {

    }

    public CreateBookRequest(Long userId, String topic, String title) {
        this.userId = userId;
        this.topic = topic;
        this.title = title;
    }

    public Long getUserId() {
        return userId;
    }

    public String getTopic() {
        return topic;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
