package com.adoption.controller;

import com.adoption.dto.MessageResponse;
import com.adoption.entity.AdoptionForm;
import com.adoption.entity.AdoptionRequest;
import com.adoption.service.AdoptionRequestService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Map;
import java.util.UUID;

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
    public ResponseEntity<?> createAdoptionRequestWithForm(
            @RequestParam("parentUserId") String parentUserId,
            @RequestParam("childId") String childId,
            @RequestParam("parentNotes") String parentNotes,
            @RequestParam(value = "reasonForAdoption", required = false) String reasonForAdoption,
            @RequestParam(value = "previousChildren", required = false) String previousChildren,
            @RequestParam(value = "maritalStatus", required = false) String maritalStatus,
            @RequestParam(value = "housingType", required = false) String housingType,
            @RequestParam(value = "householdIncome", required = false) String householdIncome,
            @RequestParam(value = "employmentStatus", required = false) String employmentStatus,
            @RequestParam(value = "referencesContact", required = false) String referencesContact,
            @RequestParam(value = "medicalHistory", required = false) String medicalHistory,
            @RequestParam(value = "criminalBackgroundCheck", required = false) String criminalBackgroundCheck,
            @RequestParam(value = "homeStudyCompleted", required = false) String homeStudyCompleted,
            @RequestParam(value = "additionalDocuments", required = false) String additionalDocuments,
            @RequestParam(value = "aadharCard", required = false) MultipartFile aadharCard,
            @RequestParam(value = "incomeProof", required = false) MultipartFile incomeProof,
            @RequestParam(value = "addressProof", required = false) MultipartFile addressProof,
            @RequestParam(value = "medicalCertificate", required = false) MultipartFile medicalCertificate,
            @RequestParam(value = "characterReference", required = false) MultipartFile characterReference,
            @RequestParam(value = "marriageCertificate", required = false) MultipartFile marriageCertificate,
            @RequestParam(value = "birthCertificate", required = false) MultipartFile birthCertificate) {
        
        try {
            System.out.println("=== Adoption Form Submission Debug ===");
            System.out.println("parentUserId: " + parentUserId);
            System.out.println("childId: " + childId);
            System.out.println("parentNotes: " + parentNotes);
            System.out.println("reasonForAdoption: " + reasonForAdoption);
            System.out.println("housingType: " + housingType);
            System.out.println("householdIncome: " + householdIncome);
            System.out.println("employmentStatus: " + employmentStatus);
            System.out.println("referencesContact: " + referencesContact);
            System.out.println("aadharCard: " + (aadharCard != null ? aadharCard.getOriginalFilename() : "null"));
            System.out.println("incomeProof: " + (incomeProof != null ? incomeProof.getOriginalFilename() : "null"));
            System.out.println("addressProof: " + (addressProof != null ? addressProof.getOriginalFilename() : "null"));
            System.out.println("=====================================");
            
            Long parentUserIdLong = Long.valueOf(parentUserId);
            Long childIdLong = Long.valueOf(childId);
            
            // Create adoption form
            AdoptionForm adoptionForm = new AdoptionForm();
            adoptionForm.setReasonForAdoption(reasonForAdoption);
            adoptionForm.setPreviousChildren("true".equalsIgnoreCase(previousChildren));
            adoptionForm.setMaritalStatus(maritalStatus);
            adoptionForm.setHousingType(housingType);
            //adoptionForm.setHouseholdIncome(householdIncome != null ? Double.valueOf(householdIncome) : null);
            adoptionForm.setEmploymentStatus(employmentStatus);
            adoptionForm.setReferencesContact(referencesContact);
            adoptionForm.setMedicalHistory(medicalHistory);
            adoptionForm.setCriminalBackgroundCheck("true".equalsIgnoreCase(criminalBackgroundCheck));
            adoptionForm.setHomeStudyCompleted("true".equalsIgnoreCase(homeStudyCompleted));
            adoptionForm.setAdditionalDocuments(additionalDocuments);
            
            // Handle file uploads and store URLs
            if (aadharCard != null && !aadharCard.isEmpty()) {
                String aadharCardUrl = saveFile(aadharCard);
                adoptionForm.setAadharCardUrl(aadharCardUrl);
            }
            if (incomeProof != null && !incomeProof.isEmpty()) {
                String incomeProofUrl = saveFile(incomeProof);
                adoptionForm.setIncomeProofUrl(incomeProofUrl);
            }
            if (addressProof != null && !addressProof.isEmpty()) {
                String addressProofUrl = saveFile(addressProof);
                adoptionForm.setAddressProofUrl(addressProofUrl);
            }
            if (medicalCertificate != null && !medicalCertificate.isEmpty()) {
                String medicalCertificateUrl = saveFile(medicalCertificate);
                adoptionForm.setMedicalCertificateUrl(medicalCertificateUrl);
            }
            if (characterReference != null && !characterReference.isEmpty()) {
                String characterReferenceUrl = saveFile(characterReference);
                adoptionForm.setCharacterReferenceUrl(characterReferenceUrl);
            }
            if (marriageCertificate != null && !marriageCertificate.isEmpty()) {
                String marriageCertificateUrl = saveFile(marriageCertificate);
                adoptionForm.setMarriageCertificateUrl(marriageCertificateUrl);
            }
            if (birthCertificate != null && !birthCertificate.isEmpty()) {
                String birthCertificateUrl = saveFile(birthCertificate);
                adoptionForm.setBirthCertificateUrl(birthCertificateUrl);
            }
            
            AdoptionRequest request = adoptionRequestService.createAdoptionRequestWithForm(
                    parentUserIdLong, childIdLong, adoptionForm, parentNotes);
            return ResponseEntity.ok(request);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
    
    private String saveFile(MultipartFile file) throws IOException {
        // Generate unique filename
        String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());
        String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String filename = UUID.randomUUID().toString() + fileExtension;
        
        // Save file to uploads directory
        Path uploadsDir = Paths.get("uploads").toAbsolutePath().normalize();
        Files.createDirectories(uploadsDir);
        Path targetLocation = uploadsDir.resolve(filename);
        Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
        
        return "/files/download/" + filename;
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

