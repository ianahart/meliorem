package com.hart.meliorem.groupmessage;

import org.hibernate.annotations.CreationTimestamp;
import java.sql.Timestamp;

import com.hart.meliorem.group.Group;
import com.hart.meliorem.user.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name = "_group_message")
public class GroupMessage {

    @Id
    @SequenceGenerator(name = "_group_message_sequence", sequenceName = "_group_message_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "_group_message_sequence")
    @Column(name = "id")
    private Long id;
    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;
    @Column(name = "message", length = 250)
    private String message;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "group_id", referencedColumnName = "id")
    private Group group;

    public GroupMessage() {

    }

    public GroupMessage(Long id, Timestamp createdAt, String message) {
        this.id = id;
        this.createdAt = createdAt;
        this.message = message;
    }

    public GroupMessage(User user, Group group, String message) {
        this.user = user;
        this.group = group;
        this.message = message;
    }

    public Long getId() {
        return id;
    }

    public Group getGroup() {
        return group;
    }

    public String getMessage() {
        return message;
    }

    public User getUser() {
        return user;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }
}
