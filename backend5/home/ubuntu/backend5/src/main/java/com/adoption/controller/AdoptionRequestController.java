package com.adoption.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
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

@Tag(name = "Adoption Requests", description = "API for managing adoption requests")
@RestController
@RequestMapping("/adoption-requests")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AdoptionRequestController {
    
    @Autowired
    private AdoptionRequestService adoptionRequestService;
    
    @Operation(summary = "Get adoption requests by parent user ID", description = "Retrieve a list of adoption requests associated with a specific parent user.")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved adoption requests",
            content = @Content(schema = @Schema(implementation = AdoptionRequest.class)))
    @ApiResponse(responseCode = "400", description = "Invalid user ID supplied",
            content = @Content(schema = @Schema(implementation = MessageResponse.class)))
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
    
    @Operation(summary = "Get adoption requests by orphanage user ID", description = "Retrieve a list of adoption requests associated with a specific orphanage user.")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved adoption requests",
            content = @Content(schema = @Schema(implementation = AdoptionRequest.class)))
    @ApiResponse(responseCode = "400", description = "Invalid user ID supplied",
            content = @Content(schema = @Schema(implementation = MessageResponse.class)))
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
    
    @Operation(summary = "Get adoption requests by orphanage user ID and status", description = "Retrieve a list of adoption requests associated with a specific orphanage user and filter by status.")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved adoption requests",
            content = @Content(schema = @Schema(implementation = AdoptionRequest.class)))
    @ApiResponse(responseCode = "400", description = "Invalid user ID or status supplied",
            content = @Content(schema = @Schema(implementation = MessageResponse.class)))
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
    
    @Operation(summary = "Get adoption request by ID", description = "Retrieve a single adoption request by its ID.")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved adoption request",
            content = @Content(schema = @Schema(implementation = AdoptionRequest.class)))
    @ApiResponse(responseCode = "400", description = "Invalid request ID supplied",
            content = @Content(schema = @Schema(implementation = MessageResponse.class)))
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
    
    @Operation(summary = "Create a new adoption request", description = "Create a new adoption request with parent and child details.")
    @ApiResponse(responseCode = "200", description = "Adoption request created successfully",
            content = @Content(schema = @Schema(implementation = AdoptionRequest.class)))
    @ApiResponse(responseCode = "400", description = "Invalid request data supplied",
            content = @Content(schema = @Schema(implementation = MessageResponse.class)))
    @RequestBody(description = "Request data for creating an adoption request", required = true,
            content = @Content(schema = @Schema(example = "{\"parentUserId\": 1, \"childId\": 1, \"parentNotes\": \"Looking forward to adopting!\"}")))
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
    
    @Operation(summary = "Create a new adoption request with form", description = "Create a new adoption request including a detailed adoption form.")
    @ApiResponse(responseCode = "200", description = "Adoption request with form created successfully",
            content = @Content(schema = @Schema(implementation = AdoptionRequest.class)))
    @ApiResponse(responseCode = "400", description = "Invalid request data or form data supplied",
            content = @Content(schema = @Schema(implementation = MessageResponse.class)))
    @RequestBody(description = "Request data for creating an adoption request with form", required = true,
            content = @Content(schema = @Schema(example = "{\"parentUserId\": 1, \"childId\": 1, \"parentNotes\": \"Notes for form\", \"adoptionForm\": {\"reasonForAdoption\": \"Love for children\", \"previousChildren\": false, \"housingType\": \"Apartment\", \"employmentStatus\": \"Employed\", \"referencesContact\": \"John Doe\", \"medicalHistory\": \"None\", \"criminalBackgroundCheck\": false, \"homeStudyCompleted\": true, \"additionalDocuments\": \"Passport\"}}")))
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
    
    @Operation(summary = "Update adoption request status", description = "Update the status of an adoption request by orphanage user.")
    @ApiResponse(responseCode = "200", description = "Adoption request status updated successfully",
            content = @Content(schema = @Schema(implementation = AdoptionRequest.class)))
    @ApiResponse(responseCode = "400", description = "Invalid request data or ID supplied",
            content = @Content(schema = @Schema(implementation = MessageResponse.class)))
    @RequestBody(description = "Request data for updating adoption request status", required = true,
            content = @Content(schema = @Schema(example = "{\"orphanageUserId\": 1, \"status\": \"APPROVED\", \"orphanageNotes\": \"Approved for adoption.\"}")))
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
    
    @Operation(summary = "Cancel an adoption request", description = "Cancel an adoption request by parent user.")
    @ApiResponse(responseCode = "200", description = "Adoption request cancelled successfully",
            content = @Content(schema = @Schema(implementation = MessageResponse.class)))
    @ApiResponse(responseCode = "400", description = "Invalid request data or ID supplied",
            content = @Content(schema = @Schema(implementation = MessageResponse.class)))
    @RequestBody(description = "Request data for cancelling an adoption request", required = true,
            content = @Content(schema = @Schema(example = "{\"parentUserId\": 1}")))
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
    
    @Operation(summary = "Get adoption form by request ID", description = "Retrieve the adoption form associated with a specific adoption request.")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved adoption form",
            content = @Content(schema = @Schema(implementation = AdoptionForm.class)))
    @ApiResponse(responseCode = "400", description = "Invalid request ID supplied or form not found",
            content = @Content(schema = @Schema(implementation = MessageResponse.class)))
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
    
    @Operation(summary = "Update adoption form", description = "Update the adoption form for a specific request.")
    @ApiResponse(responseCode = "200", description = "Adoption form updated successfully",
            content = @Content(schema = @Schema(implementation = AdoptionForm.class)))
    @ApiResponse(responseCode = "400", description = "Invalid request data or ID supplied",
            content = @Content(schema = @Schema(implementation = MessageResponse.class)))
    @RequestBody(description = "Request data for updating adoption form", required = true,
            content = @Content(schema = @Schema(example = "{\"parentUserId\": 1, \"updatedForm\": {\"reasonForAdoption\": \"Updated reason\"}}")))
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

