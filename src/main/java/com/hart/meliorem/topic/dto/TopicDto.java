package com.hart.meliorem.topic.dto;

public class TopicDto {

    private Long id;

    private String name;

    public TopicDto() {

    }

    public TopicDto(Long id, String name) {

        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }
}
