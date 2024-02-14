package com.hart.meliorem.group.dto;

public class CreateGroupDto {

    private String name;

    private Long id;

    public CreateGroupDto() {

    }

    public CreateGroupDto(String name, Long id) {
        this.name = name;
        this.id = id;
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
