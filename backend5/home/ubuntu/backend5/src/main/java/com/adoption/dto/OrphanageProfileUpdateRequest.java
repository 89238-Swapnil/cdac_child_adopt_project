package com.adoption.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Min;

public class OrphanageProfileUpdateRequest {

    @NotBlank(message = "Orphanage name cannot be empty")
    @Size(max = 200)
    private String name;

    @NotBlank(message = "Address cannot be empty")
    private String address;

    @Size(max = 20)
    private String phone;

    @NotBlank(message = "License number cannot be empty")
    @Size(max = 100)
    private String licenseNumber;

    private String description;

    @Size(max = 100)
    private String contactPerson;

    @Min(value = 1, message = "Capacity must be at least 1")
    private Integer capacity;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getLicenseNumber() { return licenseNumber; }
    public void setLicenseNumber(String licenseNumber) { this.licenseNumber = licenseNumber; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getContactPerson() { return contactPerson; }
    public void setContactPerson(String contactPerson) { this.contactPerson = contactPerson; }

    public Integer getCapacity() { return capacity; }
    public void setCapacity(Integer capacity) { this.capacity = capacity; }
}

