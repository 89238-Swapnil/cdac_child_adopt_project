package com.adoption.dto;

import com.adoption.entity.Parent;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;
import java.time.LocalDate;

@Schema(description = "Request DTO for parent registration")
public class ParentRegistrationRequest {

    @Schema(description = "Parent email address", example = "parent@example.com", required = true)
    @Email
    @NotBlank
    private String email;

    @Schema(description = "Parent password (min 6 characters)", example = "password123", required = true)
    @NotBlank
    @Size(min = 6)
    private String password;

    @Schema(description = "Parent's first name", example = "John", required = true)
    @NotBlank
    @Size(max = 100)
    private String firstName;

    @Schema(description = "Parent's last name", example = "Doe", required = true)
    @NotBlank
    @Size(max = 100)
    private String lastName;

    @Schema(description = "Parent's phone number", example = "9876543210")
    @Size(max = 20)
    private String phone;

    @Schema(description = "Parent's address", example = "123 Main Street")
    private String address;

    @Schema(description = "Parent's occupation", example = "Engineer")
    @Size(max = 100)
    private String occupation;

    @Schema(description = "Parent's annual income", example = "750000")
    private BigDecimal annualIncome;

    @Schema(description = "Parent's marital status", example = "MARRIED")
    private Parent.MaritalStatus maritalStatus;

    @Schema(description = "Parent's date of birth", example = "1990-01-01")
    private LocalDate dateOfBirth;

    // Constructors
    public ParentRegistrationRequest() {}

    // Getters and Setters
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }

    public String getOccupation() {
        return occupation;
    }
    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public BigDecimal getAnnualIncome() {
        return annualIncome;
    }
    public void setAnnualIncome(BigDecimal annualIncome) {
        this.annualIncome = annualIncome;
    }

    public Parent.MaritalStatus getMaritalStatus() {
        return maritalStatus;
    }
    public void setMaritalStatus(Parent.MaritalStatus maritalStatus) {
        this.maritalStatus = maritalStatus;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }
    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }
}
