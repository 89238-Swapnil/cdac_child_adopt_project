package com.adoption.entity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

import com.adoption.entity.Orphanage;

@Entity
@Table(name = "children")
@Data
@NoArgsConstructor
public class Child {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int age;
    private String gender;
    private String status = "Available";
    private String education;
    private String bloodGroup;
    private String colorComplexion;
    private String deficiency;
    private String medicalHistory;
    private String otherInfo;

    private LocalDate joinedDate = LocalDate.now();
    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "orphanage_id", nullable = false)
    private Orphanage orphanage; // Make sure this class is imported correctly
}
