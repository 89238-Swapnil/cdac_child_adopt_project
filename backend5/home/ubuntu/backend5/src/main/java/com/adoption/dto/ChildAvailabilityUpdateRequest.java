package com.adoption.dto;

import jakarta.validation.constraints.NotNull;

public class ChildAvailabilityUpdateRequest {

    @NotNull(message = "Orphanage User ID cannot be null")
    private Long orphanageUserId;

    @NotNull(message = "Availability status cannot be null")
    private Boolean isAvailable;

    // Getters and Setters
    public Long getOrphanageUserId() { return orphanageUserId; }
    public void setOrphanageUserId(Long orphanageUserId) { this.orphanageUserId = orphanageUserId; }

    public Boolean getIsAvailable() { return isAvailable; }
    public void setIsAvailable(Boolean isAvailable) { this.isAvailable = isAvailable; }
}

