package com.hart.meliorem.group;

import java.sql.Timestamp;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.hart.meliorem.groupmember.GroupMember;
import com.hart.meliorem.groupmessage.GroupMessage;
import com.hart.meliorem.groupstudyset.GroupStudySet;
import com.hart.meliorem.user.User;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name = "_group")
public class Group {

    @Id
    @SequenceGenerator(name = "_group_sequence", sequenceName = "_group_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "_group_sequence")
    @Column(name = "id")
    private Long id;

    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Timestamp updatedAt;

    @Column(name = "name", length = 200)
    private String name;

    @ManyToOne()
    @JoinColumn(name = "admin_id", referencedColumnName = "id")
    private User admin;

    @OneToMany(mappedBy = "group", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GroupMember> groupMembers;

    @OneToMany(mappedBy = "group", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GroupStudySet> groupStudySets;

    @OneToMany(mappedBy = "group", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GroupMessage> groupMessages;

    public Group() {
    }

    public Group(
            Long id,
            Timestamp createdAt,
            Timestamp updatedAt,
            String name) {
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.name = name;
    }

    public Group(String name, User admin) {
        this.name = name;
        this.admin = admin;
    }

    public Long getId() {
        return id;
    }

    public List<GroupMember> getGroupMembers() {
        return groupMembers;
    }

    public List<GroupStudySet> getGroupStudySets() {
        return groupStudySets;
    }

    public List<GroupMessage> getGroupMessages() {
        return groupMessages;
    }

    public User getAdmin() {
        return admin;
    }

    public String getName() {
        return name;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setAdmin(User admin) {
        this.admin = admin;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setGroupMembers(List<GroupMember> groupMembers) {
        this.groupMembers = groupMembers;
    }

    public void setGroupStudySets(List<GroupStudySet> groupStudySets) {
        this.groupStudySets = groupStudySets;
    }

    public void setGroupMessages(List<GroupMessage> groupMessages) {
        this.groupMessages = groupMessages;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((createdAt == null) ? 0 : createdAt.hashCode());
        result = prime * result + ((updatedAt == null) ? 0 : updatedAt.hashCode());
        result = prime * result + ((name == null) ? 0 : name.hashCode());
        result = prime * result + ((admin == null) ? 0 : admin.hashCode());
        result = prime * result + ((groupMembers == null) ? 0 : groupMembers.hashCode());
        result = prime * result + ((groupStudySets == null) ? 0 : groupStudySets.hashCode());
        result = prime * result + ((groupMessages == null) ? 0 : groupMessages.hashCode());
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
        Group other = (Group) obj;
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
        if (name == null) {
            if (other.name != null)
                return false;
        } else if (!name.equals(other.name))
            return false;
        if (admin == null) {
            if (other.admin != null)
                return false;
        } else if (!admin.equals(other.admin))
            return false;
        if (groupMembers == null) {
            if (other.groupMembers != null)
                return false;
        } else if (!groupMembers.equals(other.groupMembers))
            return false;
        if (groupStudySets == null) {
            if (other.groupStudySets != null)
                return false;
        } else if (!groupStudySets.equals(other.groupStudySets))
            return false;
        if (groupMessages == null) {
            if (other.groupMessages != null)
                return false;
        } else if (!groupMessages.equals(other.groupMessages))
            return false;
        return true;
    }


}
