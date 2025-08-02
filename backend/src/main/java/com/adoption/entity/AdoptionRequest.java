package com.adoption.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "adoption_requests")
@Data
@NoArgsConstructor
public class AdoptionRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "child_id", nullable = false)
    private Child child;

    @ManyToOne
    @JoinColumn(name = "parent_id", nullable = false)
    private Parent parent;

    @OneToOne
    @JoinColumn(name = "form_id")
    private AdoptionForm adoptionForm;  // Add this field

    @Column(nullable = false)
    private String status = "PENDING";

    @Column(nullable = false)
    private LocalDate requestDate = LocalDate.now();

    @Column
    private String notes;
}