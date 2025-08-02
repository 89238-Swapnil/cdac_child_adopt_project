package com.adoption.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class AdoptionFormDTO {
    private Long formId;
    private Long childId;

    private String nationality;
    private String applicantGender;
    private String permanentAddress;

    private String spouseName;
    private String spouseGender;

    private String occupation;
    private String annualIncome;
    private String companyDetails;

    private String qualification;
    private String adoptionReason;
    private String biologicalChildren;

    private String pancard;
    private String identityProof;
    private String addressProof;
    private String incomeProof;
    private String nonCriminalCertificate;
    private String nationalityCertificate;

    private Long parentId;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
