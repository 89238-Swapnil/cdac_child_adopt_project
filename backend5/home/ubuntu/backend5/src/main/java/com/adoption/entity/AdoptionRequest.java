package com.adoption.entity;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "adoption_requests", 
       uniqueConstraints = @UniqueConstraint(columnNames = {"parent_id", "child_id"}))
@EntityListeners(AuditingEntityListener.class)
public class AdoptionRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id", nullable = false)
    private Parent parent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "child_id", nullable = false)
    private Child child;

    @Column(name = "request_date")
    private LocalDateTime requestDate = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    private Status status = Status.PENDING;

    @Column(name = "parent_notes", columnDefinition = "TEXT")
    private String parentNotes;

    @Column(name = "orphanage_notes", columnDefinition = "TEXT")
    private String orphanageNotes;

    @Column(columnDefinition = "JSON")
    private String documents;

    @Column(name = "response_date")
    private LocalDateTime responseDate;

    @OneToOne(mappedBy = "adoptionRequest", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private AdoptionForm adoptionForm;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Constructors
    public AdoptionRequest() {}

    public AdoptionRequest(Parent parent, Child child) {
        this.parent = parent;
        this.child = child;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Parent getParent() {
        return parent;
    }

    public void setParent(Parent parent) {
        this.parent = parent;
    }

    public Child getChild() {
        return child;
    }

    public void setChild(Child child) {
        this.child = child;
    }

    public LocalDateTime getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(LocalDateTime requestDate) {
        this.requestDate = requestDate;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getParentNotes() {
        return parentNotes;
    }

    public void setParentNotes(String parentNotes) {
        this.parentNotes = parentNotes;
    }

    public String getOrphanageNotes() {
        return orphanageNotes;
    }

    public void setOrphanageNotes(String orphanageNotes) {
        this.orphanageNotes = orphanageNotes;
    }

    public String getDocuments() {
        return documents;
    }

    public void setDocuments(String documents) {
        this.documents = documents;
    }

    public LocalDateTime getResponseDate() {
        return responseDate;
    }

    public void setResponseDate(LocalDateTime responseDate) {
        this.responseDate = responseDate;
    }

    public AdoptionForm getAdoptionForm() {
        return adoptionForm;
    }

    public void setAdoptionForm(AdoptionForm adoptionForm) {
        this.adoptionForm = adoptionForm;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public enum Status {
        PENDING, APPROVED, REJECTED
    }
}

