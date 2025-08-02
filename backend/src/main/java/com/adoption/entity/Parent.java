package com.adoption.entity;

import java.util.List;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "parents")
@Data
@NoArgsConstructor
public class Parent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String state;

    @Column(nullable = false)
    private String pincode;

    @Column
    private String imageUrl;

    // This field won't be stored in DB as it's for form submission only
    @Transient
    private String confirmPassword;
    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    private List<AdoptionForm> adoptionForms;

    // This field won't be stored in DB as it's for file upload handling
    @Transient
    private Object imageFile;
}