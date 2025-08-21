package com.adoption.controller;

import com.adoption.dto.MessageResponse;
import com.adoption.entity.Child;
import com.adoption.service.ChildService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/children")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ChildController {
    
    @Autowired
    private ChildService childService;
    
    @GetMapping("/available")
    public ResponseEntity<?> getAllAvailableChildren() {
        try {
            List<Child> children = childService.getAllAvailableChildren();
            return ResponseEntity.ok(children);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
    
    @GetMapping("/orphanage/{orphanageId}")
    @PreAuthorize("hasRole('PARENT')")
    public ResponseEntity<?> getAvailableChildrenByOrphanage(@PathVariable Long orphanageId) {
        try {
            List<Child> children = childService.getAvailableChildrenByOrphanage(orphanageId);
            return ResponseEntity.ok(children);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
    
    @GetMapping("/my-children/{userId}")
    @PreAuthorize("hasRole('ORPHANAGE')")
    public ResponseEntity<?> getMyChildren(@PathVariable Long userId) {
        try {
            List<Child> children = childService.getChildrenByOrphanageUser(userId);
            return ResponseEntity.ok(children);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
    
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('PARENT') or hasRole('ORPHANAGE')")
    public ResponseEntity<?> getChildById(@PathVariable Long id) {
        try {
            Child child = childService.getChildById(id);
            return ResponseEntity.ok(child);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
    
    @PostMapping
    @PreAuthorize("hasRole('ORPHANAGE')")
    public ResponseEntity<?> addChild(@RequestBody Map<String, Object> requestData) {
        try {
            Long orphanageUserId = Long.valueOf(requestData.get("orphanageUserId").toString());
            
            // Extract child data
            @SuppressWarnings("unchecked")
            Map<String, Object> childData = (Map<String, Object>) requestData.get("child");
            
            Child child = new Child();
            child.setFirstName((String) childData.get("firstName"));
            child.setLastName((String) childData.get("lastName"));
            child.setAge(Integer.valueOf(childData.get("age").toString()));
            child.setGender(Child.Gender.valueOf((String) childData.get("gender")));
            child.setHealthStatus((String) childData.get("healthStatus"));
            child.setDescription((String) childData.get("description"));
            child.setSpecialNeeds((String) childData.get("specialNeeds"));
            
            // Handle date fields
            if (childData.get("dateOfBirth") != null && !childData.get("dateOfBirth").toString().isEmpty()) {
                try {
                    LocalDate dateOfBirth = LocalDate.parse(childData.get("dateOfBirth").toString());
                    child.setDateOfBirth(dateOfBirth);
                } catch (DateTimeParseException e) {
                    return ResponseEntity.badRequest()
                            .body(new MessageResponse("Error: Invalid date of birth format. Use YYYY-MM-DD"));
                }
            }
            
            if (childData.get("admissionDate") != null && !childData.get("admissionDate").toString().isEmpty()) {
                try {
                    LocalDate admissionDate = LocalDate.parse(childData.get("admissionDate").toString());
                    child.setAdmissionDate(admissionDate);
                } catch (DateTimeParseException e) {
                    return ResponseEntity.badRequest()
                            .body(new MessageResponse("Error: Invalid admission date format. Use YYYY-MM-DD"));
                }
            }
            
            // Handle availability
            if (childData.get("isAvailable") != null) {
                child.setIsAvailable(Boolean.valueOf(childData.get("isAvailable").toString()));
            } else {
                child.setIsAvailable(true); // Default to available
            }
            
            Child savedChild = childService.addChild(orphanageUserId, child);
            return ResponseEntity.ok(savedChild);
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Invalid age format. Age must be a number."));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Invalid gender. Must be MALE or FEMALE."));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ORPHANAGE')")
    public ResponseEntity<?> updateChild(@RequestBody Map<String, Object> requestData,
                                       @PathVariable Long id) {
        try {
            Long orphanageUserId = Long.valueOf(requestData.get("orphanageUserId").toString());
            
            // Extract child data
            @SuppressWarnings("unchecked")
            Map<String, Object> childData = (Map<String, Object>) requestData.get("child");
            
            Child updatedChild = new Child();
            updatedChild.setFirstName((String) childData.get("firstName"));
            updatedChild.setLastName((String) childData.get("lastName"));
            updatedChild.setAge(Integer.valueOf(childData.get("age").toString()));
            updatedChild.setGender(Child.Gender.valueOf((String) childData.get("gender")));
            updatedChild.setHealthStatus((String) childData.get("healthStatus"));
            updatedChild.setDescription((String) childData.get("description"));
            updatedChild.setSpecialNeeds((String) childData.get("specialNeeds"));
            
            // Handle date fields
            if (childData.get("dateOfBirth") != null && !childData.get("dateOfBirth").toString().isEmpty()) {
                try {
                    LocalDate dateOfBirth = LocalDate.parse(childData.get("dateOfBirth").toString());
                    updatedChild.setDateOfBirth(dateOfBirth);
                } catch (DateTimeParseException e) {
                    return ResponseEntity.badRequest()
                            .body(new MessageResponse("Error: Invalid date of birth format. Use YYYY-MM-DD"));
                }
            }
            
            if (childData.get("admissionDate") != null && !childData.get("admissionDate").toString().isEmpty()) {
                try {
                    LocalDate admissionDate = LocalDate.parse(childData.get("admissionDate").toString());
                    updatedChild.setAdmissionDate(admissionDate);
                } catch (DateTimeParseException e) {
                    return ResponseEntity.badRequest()
                            .body(new MessageResponse("Error: Invalid admission date format. Use YYYY-MM-DD"));
                }
            }
            
            // Handle availability
            if (childData.get("isAvailable") != null) {
                updatedChild.setIsAvailable(Boolean.valueOf(childData.get("isAvailable").toString()));
            }
            
            Child child = childService.updateChild(orphanageUserId, id, updatedChild);
            return ResponseEntity.ok(child);
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Invalid age format. Age must be a number."));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Invalid gender. Must be MALE or FEMALE."));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ORPHANAGE')")
    public ResponseEntity<?> deleteChild(@RequestBody Map<String, Object> requestData,
                                       @PathVariable Long id) {
        try {
            Long orphanageUserId = Long.valueOf(requestData.get("orphanageUserId").toString());
            childService.deleteChild(orphanageUserId, id);
            return ResponseEntity.ok(new MessageResponse("Child deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
    
    @PutMapping("/{id}/availability")
    @PreAuthorize("hasRole('ORPHANAGE')")
    public ResponseEntity<?> updateChildAvailability(@RequestBody Map<String, Object> requestData,
                                                   @PathVariable Long id) {
        try {
            Long orphanageUserId = Long.valueOf(requestData.get("orphanageUserId").toString());
            Boolean isAvailable = (Boolean) requestData.get("isAvailable");
            childService.updateChildAvailability(orphanageUserId, id, isAvailable);
            return ResponseEntity.ok(new MessageResponse("Child availability updated successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
}

