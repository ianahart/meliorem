package com.hart.meliorem.groupmember.request;

public class UpdateGroupMemberRequest {

    private Boolean accepted;

    private Long groupId;

    public UpdateGroupMemberRequest() {

    }

    public UpdateGroupMemberRequest(Boolean accepted, Long groupId) {
        this.accepted = accepted;
        this.groupId = groupId;
    }

    public Boolean getAccepted() {
        return accepted;
    }

    public Long getGroupId() {
        return groupId;
    }

    public void setGroupId(Long groupId) {
        this.groupId = groupId;
    }

    public void setAccepted(Boolean accepted) {
        this.accepted = accepted;
    }
}
