package com.adoption.controller;

import com.adoption.dto.MessageResponse;
import com.adoption.entity.AdoptionForm;
import com.adoption.entity.AdoptionRequest;
import com.adoption.service.AdoptionRequestService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/adoption-requests")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AdoptionRequestController {
    
    @Autowired
    private AdoptionRequestService adoptionRequestService;
    
    @GetMapping("/my-requests/{userId}")
    public ResponseEntity<?> getMyRequests(@PathVariable Long userId) {
        try {
            List<AdoptionRequest> requests = adoptionRequestService.getRequestsByParent(userId);
            return ResponseEntity.ok(requests);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
    
    @GetMapping("/orphanage-requests/{userId}")
    public ResponseEntity<?> getOrphanageRequests(@PathVariable Long userId) {
        try {
            List<AdoptionRequest> requests = adoptionRequestService.getRequestsByOrphanage(userId);
            return ResponseEntity.ok(requests);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
    
    @GetMapping("/orphanage-requests/{userId}/status/{status}")
    public ResponseEntity<?> getOrphanageRequestsByStatus(@PathVariable Long userId,
                                                        @PathVariable AdoptionRequest.Status status) {
        try {
            List<AdoptionRequest> requests = adoptionRequestService.getRequestsByOrphanageAndStatus(
                    userId, status);
            return ResponseEntity.ok(requests);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getRequestById(@PathVariable Long id) {
        try {
            AdoptionRequest request = adoptionRequestService.getRequestById(id);
            return ResponseEntity.ok(request);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
    
    @PostMapping("/create")
    public ResponseEntity<?> createAdoptionRequest(@RequestBody Map<String, Object> requestData) {
        try {
            Long parentUserId = Long.valueOf(requestData.get("parentUserId").toString());
            Long childId = Long.valueOf(requestData.get("childId").toString());
            String parentNotes = (String) requestData.get("parentNotes");
            
            AdoptionRequest request = adoptionRequestService.createAdoptionRequest(
                    parentUserId, childId, parentNotes);
            return ResponseEntity.ok(request);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
    
    @PostMapping("/create-with-form")
    public ResponseEntity<?> createAdoptionRequestWithForm(@RequestBody Map<String, Object> requestData) {
        try {
            Long parentUserId = Long.valueOf(requestData.get("parentUserId").toString());
            Long childId = Long.valueOf(requestData.get("childId").toString());
            String parentNotes = (String) requestData.get("parentNotes");
            
            // Extract adoption form data
            @SuppressWarnings("unchecked")
            Map<String, Object> formData = (Map<String, Object>) requestData.get("adoptionForm");
            
            AdoptionForm adoptionForm = new AdoptionForm();
            if (formData.get("reasonForAdoption") != null) {
                adoptionForm.setReasonForAdoption((String) formData.get("reasonForAdoption"));
            }
            if (formData.get("previousChildren") != null) {
                adoptionForm.setPreviousChildren((Boolean) formData.get("previousChildren"));
            }
            if (formData.get("housingType") != null) {
                adoptionForm.setHousingType((String) formData.get("housingType"));
            }
            if (formData.get("employmentStatus") != null) {
                adoptionForm.setEmploymentStatus((String) formData.get("employmentStatus"));
            }
            if (formData.get("referencesContact") != null) {
                adoptionForm.setReferencesContact((String) formData.get("referencesContact"));
            }
            if (formData.get("medicalHistory") != null) {
                adoptionForm.setMedicalHistory((String) formData.get("medicalHistory"));
            }
            if (formData.get("criminalBackgroundCheck") != null) {
                adoptionForm.setCriminalBackgroundCheck((Boolean) formData.get("criminalBackgroundCheck"));
            }
            if (formData.get("homeStudyCompleted") != null) {
                adoptionForm.setHomeStudyCompleted((Boolean) formData.get("homeStudyCompleted"));
            }
            if (formData.get("additionalDocuments") != null) {
                adoptionForm.setAdditionalDocuments((String) formData.get("additionalDocuments"));
            }
            
            AdoptionRequest request = adoptionRequestService.createAdoptionRequestWithForm(
                    parentUserId, childId, adoptionForm, parentNotes);
            return ResponseEntity.ok(request);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateRequestStatus(@RequestBody Map<String, Object> statusData,
                                               @PathVariable Long id) {
        try {
            Long orphanageUserId = Long.valueOf(statusData.get("orphanageUserId").toString());
            AdoptionRequest.Status status = AdoptionRequest.Status.valueOf((String) statusData.get("status"));
            String orphanageNotes = (String) statusData.get("orphanageNotes");
            
            AdoptionRequest request = adoptionRequestService.updateRequestStatus(
                    orphanageUserId, id, status, orphanageNotes);
            return ResponseEntity.ok(request);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> cancelRequest(@RequestBody Map<String, Object> requestData,
                                         @PathVariable Long id) {
        try {
            Long parentUserId = Long.valueOf(requestData.get("parentUserId").toString());
            adoptionRequestService.cancelRequest(parentUserId, id);
            return ResponseEntity.ok(new MessageResponse("Adoption request cancelled successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
    
    @GetMapping("/{id}/form")
    public ResponseEntity<?> getAdoptionForm(@PathVariable Long id) {
        try {
            AdoptionForm form = adoptionRequestService.getAdoptionForm(id)
                    .orElseThrow(() -> new RuntimeException("Adoption form not found"));
            return ResponseEntity.ok(form);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
    
    @PutMapping("/{id}/form")
    public ResponseEntity<?> updateAdoptionForm(@RequestBody Map<String, Object> requestData,
                                              @PathVariable Long id,
                                              @Valid @RequestBody AdoptionForm updatedForm) {
        try {
            Long parentUserId = Long.valueOf(requestData.get("parentUserId").toString());
            AdoptionForm form = adoptionRequestService.updateAdoptionForm(
                    parentUserId, id, updatedForm);
            return ResponseEntity.ok(form);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
}

