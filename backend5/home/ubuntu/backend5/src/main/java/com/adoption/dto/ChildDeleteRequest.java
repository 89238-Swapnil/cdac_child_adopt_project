package com.adoption.dto;

import jakarta.validation.constraints.NotNull;

public class ChildDeleteRequest {

    @NotNull(message = "Orphanage User ID cannot be null")
    private Long orphanageUserId;

    // Getters and Setters
    public Long getOrphanageUserId() { return orphanageUserId; }
    public void setOrphanageUserId(Long orphanageUserId) { this.orphanageUserId = orphanageUserId; }
}

