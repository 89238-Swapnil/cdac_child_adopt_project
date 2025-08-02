package com.adoption.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class AdoptionRequestDTO {
    private Long id;
    private Long childId;
    private Long parentId;
    private Long formId;

    private String status;
    private LocalDate requestDate;
    private String notes;
}
