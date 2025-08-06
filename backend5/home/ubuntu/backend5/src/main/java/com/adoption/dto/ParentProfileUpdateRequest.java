package com.adoption.dto;

import com.adoption.entity.Parent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDate;

public class ParentProfileUpdateRequest {

    @NotBlank(message = "First name cannot be empty")
    @Size(max = 100)
    private String firstName;

    @NotBlank(message = "Last name cannot be empty")
    @Size(max = 100)
    private String lastName;

    @Size(max = 20)
    private String phone;

    private String address;

    @Size(max = 100)
    private String occupation;

    private BigDecimal annualIncome;

    private Parent.MaritalStatus maritalStatus;

    private LocalDate dateOfBirth;

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getOccupation() { return occupation; }
    public void setOccupation(String occupation) { this.occupation = occupation; }

    public BigDecimal getAnnualIncome() { return annualIncome; }
    public void setAnnualIncome(BigDecimal annualIncome) { this.annualIncome = annualIncome; }

    public Parent.MaritalStatus getMaritalStatus() { return maritalStatus; }
    public void setMaritalStatus(Parent.MaritalStatus maritalStatus) { this.maritalStatus = maritalStatus; }

    public LocalDate getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; }
}


