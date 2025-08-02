package com.adoption.dto;

import lombok.Data;

@Data
public class OrphanageDTO {
    private Long id;
    private String registrationNumber;
    private String name;
    private String email;
    private String phone;
    private String address;
    private String city;
    private String state;
    private String pincode;
    private int totalChildren; // Optional: Useful for dashboard views
}
