package com.hart.meliorem.group.request;

public class UpdateGroupRequest {

    private Long newAdminId;

    private Long oldAdminId;

    public UpdateGroupRequest() {

    }

    public UpdateGroupRequest(Long newAdminId, Long oldAdminId) {
        this.newAdminId = newAdminId;
        this.oldAdminId = oldAdminId;
    }

    public Long getNewAdminId() {
        return newAdminId;
    }

    public Long getOldAdminId() {
        return oldAdminId;
    }

    public void setNewAdminId(Long newAdminId) {
        this.newAdminId = newAdminId;
    }

    public void setOldAdminId(Long oldAdminId) {
        this.oldAdminId = oldAdminId;
    }
}
