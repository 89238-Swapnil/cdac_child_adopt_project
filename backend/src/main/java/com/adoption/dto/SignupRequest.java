package com.adoption.dto;

import jakarta.validation.constraints.*;

import lombok.Data;

@Data
public class SignupRequest {
    @NotBlank
    private String userType; // "parent" or "orphanage"

    // Parent fields
    private String fullName;
    private String address;
    private String phone;

    // Orphanage fields
    private String orphanageName;
    private String adminName;
    private String location;
    private String contactNumber;

    @NotBlank
    private String email;

    @Size(min = 6)
    private String password;
}
