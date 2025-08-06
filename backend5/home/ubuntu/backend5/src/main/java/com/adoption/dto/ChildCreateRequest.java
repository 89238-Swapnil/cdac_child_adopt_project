package com.adoption.dto;

import com.adoption.entity.Child;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ChildCreateRequest {

    @NotNull(message = "Orphanage User ID cannot be null")
    private Long orphanageUserId;

    @NotBlank(message = "First name cannot be empty")
    @Size(max = 100)
    private String firstName;

    @NotBlank(message = "Last name cannot be empty")
    @Size(max = 100)
    private String lastName;

    @Min(value = 0, message = "Age cannot be negative")
    private Integer age;

    @NotNull(message = "Gender cannot be null")
    private Child.Gender gender;

    private String healthStatus;

    private String description;

    private String specialNeeds;

    // Getters and Setters
    public Long getOrphanageUserId() { return orphanageUserId; }
    public void setOrphanageUserId(Long orphanageUserId) { this.orphanageUserId = orphanageUserId; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }

    public Child.Gender getGender() { return gender; }
    public void setGender(Child.Gender gender) { this.gender = gender; }

    public String getHealthStatus() { return healthStatus; }
    public void setHealthStatus(String healthStatus) { this.healthStatus = healthStatus; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getSpecialNeeds() { return specialNeeds; }
    public void setSpecialNeeds(String specialNeeds) { this.specialNeeds = specialNeeds; }
}


