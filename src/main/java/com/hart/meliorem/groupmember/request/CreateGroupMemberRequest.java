package com.hart.meliorem.groupmember.request;

public class CreateGroupMemberRequest {

    private Long groupId;

    private Long memberId;

    private Long inviterId;

    public CreateGroupMemberRequest() {

    }

    public CreateGroupMemberRequest(Long groupId, Long memberId, Long inviterId) {
        this.groupId = groupId;
        this.memberId = memberId;
        this.inviterId = inviterId;
    }

    public Long getGroupId() {
        return groupId;
    }

    public Long getMemberId() {
        return memberId;
    }

    public Long getInviterId() {
        return inviterId;
    }

    public void setGroupId(Long groupId) {
        this.groupId = groupId;
    }

    public void setMemberId(Long memberId) {
        this.memberId = memberId;
    }

    public void setInviterId(Long inviterId) {
        this.inviterId = inviterId;
    }
}
