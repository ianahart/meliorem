package com.hart.meliorem.groupmessage.request;

public class CreateGroupMessageRequest {

    private Long groupId;

    private Long userId;

    private String message;

    public CreateGroupMessageRequest() {

    }

    public CreateGroupMessageRequest(Long groupId, Long userId, String message) {
        this.groupId = groupId;
        this.userId = userId;
        this.message = message;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getGroupId() {
        return groupId;
    }

    public String getMessage() {
        return message;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setGroupId(Long groupId) {
        this.groupId = groupId;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
