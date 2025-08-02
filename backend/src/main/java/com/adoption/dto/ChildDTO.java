package com.adoption.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class ChildDTO {
    private Long id;
    private String name;
    private int age;
    private String gender;
    private String status;
    private String education;
    private String bloodGroup;
    private String colorComplexion;
    private String deficiency;
    private String medicalHistory;
    private String otherInfo;
    private LocalDate joinedDate;
    private String imageUrl;
    private Long orphanageId;
}
