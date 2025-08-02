package com.adoption.dto;

import lombok.Data;

@Data
public class ParentDTO {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String address;
    private String city;
    private String state;
    private String pincode;
    private String imageUrl;
}
