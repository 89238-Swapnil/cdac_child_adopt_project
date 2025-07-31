package com.adoption.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Orphanage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String orphanageName;
    private String adminName;
    private String email;
    private String password; // Hashed password
    private String location;
    private String contactNumber;
}
