package com.hart.meliorem.groupmember;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.hart.meliorem.group.Group;
import com.hart.meliorem.user.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Table;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;

@Entity()
@Table(name = "_group_member")
public class GroupMember {

    @Id
    @SequenceGenerator(name = "_group_member_sequence", sequenceName = "_group_member_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "_group_member_sequence")
    @Column(name = "id")
    private Long id;
    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;
    @UpdateTimestamp
    @Column(name = "updated_at")
    private Timestamp updatedAt;
    @Column(name = "requested")
    private Boolean requested;
    @Column(name = "accepted")
    private Boolean accepted;
    @JoinColumn(name = "group_id", referencedColumnName = "id")
    @ManyToOne()
    private Group group;
    @JoinColumn(name = "member_id", referencedColumnName = "id")
    @ManyToOne()
    private User member;
    @JoinColumn(name = "inviter_id", referencedColumnName = "id")
    @ManyToOne()
    private User inviter;

    public GroupMember() {

    }

    public GroupMember(
            Long id,
            Timestamp createdAt,
            Timestamp updatedAt,
            Boolean accepted,
            Boolean requested) {
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.accepted = accepted;
        this.requested = requested;
    }

    public GroupMember(
            Group group,
            User member,
            User inviter,
            Boolean accepted,
            Boolean requested

    ) {
        this.group = group;
        this.member = member;
        this.inviter = inviter;
        this.accepted = accepted;
        this.requested = requested;
    }

    public Long getId() {
        return id;
    }

    public User getMember() {
        return member;
    }

    public User getInviter() {
        return inviter;
    }

    public Group getGroup() {
        return group;
    }

    public Boolean getAccepted() {
        return accepted;
    }

    public Boolean getRequested() {
        return requested;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

    public void setMember(User member) {
        this.member = member;
    }

    public void setAccepted(Boolean accepted) {
        this.accepted = accepted;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setRequested(Boolean requested) {
        this.requested = requested;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setInviter(User inviter) {
        this.inviter = inviter;
    }
}
