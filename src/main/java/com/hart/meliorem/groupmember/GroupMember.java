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

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((createdAt == null) ? 0 : createdAt.hashCode());
        result = prime * result + ((updatedAt == null) ? 0 : updatedAt.hashCode());
        result = prime * result + ((requested == null) ? 0 : requested.hashCode());
        result = prime * result + ((accepted == null) ? 0 : accepted.hashCode());
        result = prime * result + ((group == null) ? 0 : group.hashCode());
        result = prime * result + ((member == null) ? 0 : member.hashCode());
        result = prime * result + ((inviter == null) ? 0 : inviter.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        GroupMember other = (GroupMember) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (createdAt == null) {
            if (other.createdAt != null)
                return false;
        } else if (!createdAt.equals(other.createdAt))
            return false;
        if (updatedAt == null) {
            if (other.updatedAt != null)
                return false;
        } else if (!updatedAt.equals(other.updatedAt))
            return false;
        if (requested == null) {
            if (other.requested != null)
                return false;
        } else if (!requested.equals(other.requested))
            return false;
        if (accepted == null) {
            if (other.accepted != null)
                return false;
        } else if (!accepted.equals(other.accepted))
            return false;
        if (group == null) {
            if (other.group != null)
                return false;
        } else if (!group.equals(other.group))
            return false;
        if (member == null) {
            if (other.member != null)
                return false;
        } else if (!member.equals(other.member))
            return false;
        if (inviter == null) {
            if (other.inviter != null)
                return false;
        } else if (!inviter.equals(other.inviter))
            return false;
        return true;
    }


}
