package com.adoption.entity;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "adoption_forms")
@EntityListeners(AuditingEntityListener.class)
public class AdoptionForm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "adoption_request_id", nullable = false, unique = true)
    private AdoptionRequest adoptionRequest;

    @Column(name = "reason_for_adoption", columnDefinition = "TEXT")
    private String reasonForAdoption;

    @Column(name = "previous_children")
    private Boolean previousChildren = false;

    @Column(name = "marital_status")
    private String maritalStatus;

    @Column(name = "housing_type")
    private String housingType;

    @Column(name = "household_income", precision = 12, scale = 2)
    private BigDecimal householdIncome;

    @Column(name = "employment_status")
    private String employmentStatus;

    @Column(name = "references_contact", columnDefinition = "TEXT")
    private String referencesContact;

    @Column(name = "medical_history", columnDefinition = "TEXT")
    private String medicalHistory;

    @Column(name = "criminal_background_check")
    private Boolean criminalBackgroundCheck = false;

    @Column(name = "home_study_completed")
    private Boolean homeStudyCompleted = false;

    @Column(name = "additional_documents", columnDefinition = "TEXT")
    private String additionalDocuments;

    // Document upload fields
    @Column(name = "aadhar_card_url")
    private String aadharCardUrl;

    @Column(name = "income_proof_url")
    private String incomeProofUrl;

    @Column(name = "address_proof_url")
    private String addressProofUrl;

    @Column(name = "medical_certificate_url")
    private String medicalCertificateUrl;

    @Column(name = "character_reference_url")
    private String characterReferenceUrl;

    @Column(name = "marriage_certificate_url")
    private String marriageCertificateUrl;

    @Column(name = "birth_certificate_url")
    private String birthCertificateUrl;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Constructors
    public AdoptionForm() {}

    public AdoptionForm(AdoptionRequest adoptionRequest) {
        this.adoptionRequest = adoptionRequest;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AdoptionRequest getAdoptionRequest() {
        return adoptionRequest;
    }

    public void setAdoptionRequest(AdoptionRequest adoptionRequest) {
        this.adoptionRequest = adoptionRequest;
    }

    public String getReasonForAdoption() {
        return reasonForAdoption;
    }

    public void setReasonForAdoption(String reasonForAdoption) {
        this.reasonForAdoption = reasonForAdoption;
    }

    public Boolean getPreviousChildren() {
        return previousChildren;
    }

    public void setPreviousChildren(Boolean previousChildren) {
        this.previousChildren = previousChildren;
    }

    public String getMaritalStatus() {
        return maritalStatus;
    }

    public void setMaritalStatus(String maritalStatus) {
        this.maritalStatus = maritalStatus;
    }

    public String getHousingType() {
        return housingType;
    }

    public void setHousingType(String housingType) {
        this.housingType = housingType;
    }

    public BigDecimal getHouseholdIncome() {
        return householdIncome;
    }

    public void setHouseholdIncome(BigDecimal householdIncome) {
        this.householdIncome = householdIncome;
    }

    public String getEmploymentStatus() {
        return employmentStatus;
    }

    public void setEmploymentStatus(String employmentStatus) {
        this.employmentStatus = employmentStatus;
    }

    public String getReferencesContact() {
        return referencesContact;
    }

    public void setReferencesContact(String referencesContact) {
        this.referencesContact = referencesContact;
    }

    public String getMedicalHistory() {
        return medicalHistory;
    }

    public void setMedicalHistory(String medicalHistory) {
        this.medicalHistory = medicalHistory;
    }

    public Boolean getCriminalBackgroundCheck() {
        return criminalBackgroundCheck;
    }

    public void setCriminalBackgroundCheck(Boolean criminalBackgroundCheck) {
        this.criminalBackgroundCheck = criminalBackgroundCheck;
    }

    public Boolean getHomeStudyCompleted() {
        return homeStudyCompleted;
    }

    public void setHomeStudyCompleted(Boolean homeStudyCompleted) {
        this.homeStudyCompleted = homeStudyCompleted;
    }

    public String getAdditionalDocuments() {
        return additionalDocuments;
    }

    public void setAdditionalDocuments(String additionalDocuments) {
        this.additionalDocuments = additionalDocuments;
    }

    // Document URL getters and setters
    public String getAadharCardUrl() {
        return aadharCardUrl;
    }

    public void setAadharCardUrl(String aadharCardUrl) {
        this.aadharCardUrl = aadharCardUrl;
    }

    public String getIncomeProofUrl() {
        return incomeProofUrl;
    }

    public void setIncomeProofUrl(String incomeProofUrl) {
        this.incomeProofUrl = incomeProofUrl;
    }

    public String getAddressProofUrl() {
        return addressProofUrl;
    }

    public void setAddressProofUrl(String addressProofUrl) {
        this.addressProofUrl = addressProofUrl;
    }

    public String getMedicalCertificateUrl() {
        return medicalCertificateUrl;
    }

    public void setMedicalCertificateUrl(String medicalCertificateUrl) {
        this.medicalCertificateUrl = medicalCertificateUrl;
    }

    public String getCharacterReferenceUrl() {
        return characterReferenceUrl;
    }

    public void setCharacterReferenceUrl(String characterReferenceUrl) {
        this.characterReferenceUrl = characterReferenceUrl;
    }

    public String getMarriageCertificateUrl() {
        return marriageCertificateUrl;
    }

    public void setMarriageCertificateUrl(String marriageCertificateUrl) {
        this.marriageCertificateUrl = marriageCertificateUrl;
    }

    public String getBirthCertificateUrl() {
        return birthCertificateUrl;
    }

    public void setBirthCertificateUrl(String birthCertificateUrl) {
        this.birthCertificateUrl = birthCertificateUrl;
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
}

