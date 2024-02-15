package com.hart.meliorem.group.dto;

public class GroupDto {

    private String name;

    private Long id;

    private Long adminId;

    public GroupDto() {

    }

    public GroupDto(String name, Long id, Long adminId) {
        this.name = name;
        this.id = id;
        this.adminId = adminId;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Long getAdminId() {
        return adminId;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setAdminId(Long adminId) {
        this.adminId = adminId;
    }

    public void setName(String name) {
        this.name = name;
    }
}
