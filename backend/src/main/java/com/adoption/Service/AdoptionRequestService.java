package com.adoption.Service;

import java.util.List;

import com.adoption.dto.AdoptionRequestDTO;

public interface AdoptionRequestService {
    AdoptionRequestDTO createRequest(AdoptionRequestDTO requestDTO);
    AdoptionRequestDTO getRequestById(Long id);
    List<AdoptionRequestDTO> getRequestsByParent(Long parentId);
    List<AdoptionRequestDTO> getRequestsByOrphanage(Long orphanageId);
    AdoptionRequestDTO updateRequestStatus(Long id, String status, String notes);
}