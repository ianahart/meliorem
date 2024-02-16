package com.hart.meliorem.groupmember.dto;

import java.sql.Timestamp;

public class GroupMemberInviteDto {

    private Long groupMemberId;

    private Long groupId;

    private String groupName;

    private String fullName;

    private Timestamp createdAt;

    public GroupMemberInviteDto() {

    }

    public GroupMemberInviteDto(
            Long groupMemberId,
            Long groupId,
            String groupName,
            String fullName,
            Timestamp createdAt) {
        this.groupMemberId = groupMemberId;
        this.groupId = groupId;
        this.groupName = groupName;
        this.fullName = fullName;
        this.createdAt = createdAt;
    }

    public Long getGroupId() {
        return groupId;
    }

    public String getFullName() {
        return fullName;
    }

    public String getGroupName() {
        return groupName;
    }

    public Long getGroupMemberId() {
        return groupMemberId;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setGroupId(Long groupId) {
        this.groupId = groupId;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setGroupMemberId(Long groupMemberId) {
        this.groupMemberId = groupMemberId;
    }
}
