package com.adoption.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "adoption_forms")
@Data
@NoArgsConstructor
public class AdoptionForm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long formId;

    // Child Information
    @Column(nullable = false)
    private Long childId;

    // Applicant Information
    @Column(nullable = false)
    private String nationality;
    
    @Column(nullable = false)
    private String applicantGender;
    
    @Column(nullable = false, length = 500)
    private String permanentAddress;

    // Spouse Information
    @Column
    private String spouseName;
    
    @Column
    private String spouseGender;

    // Employment Information
    @Column(nullable = false)
    private String occupation;
    
    @Column(nullable = false)
    private String annualIncome;
    
    @Column
    private String companyDetails;

    // Education Information
    @Column(nullable = false)
    private String qualification;

    // Adoption Details
    @Column(nullable = false, length = 1000)
    private String adoptionReason;
    
    @Column(nullable = false)
    private String biologicalChildren;

    // Document References
    @Column(nullable = false)
    private String pancard;
    
    @Column(nullable = false)
    private String identityProof;
    
    @Column(nullable = false)
    private String addressProof;
    
    @Column(nullable = false)
    private String incomeProof;
    
    @Column(nullable = false)
    private String nonCriminalCertificate;
    
    @Column(nullable = false)
    private String nationalityCertificate;

    // Relationship with Parent
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id", nullable = false)
    private Parent parent;

    // Relationship with AdoptionRequest
    @OneToOne(mappedBy = "adoptionForm", cascade = CascadeType.ALL)
    private AdoptionRequest adoptionRequest;


    // Timestamps
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @Column
    private LocalDateTime updatedAt;
}