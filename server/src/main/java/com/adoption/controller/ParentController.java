package com.adoption.controller;

import com.adoption.dto.MessageResponse;
import com.adoption.dto.PasswordChangeRequest;
import com.adoption.entity.Parent;
import com.adoption.service.ParentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/parent")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ParentController {
    
    @Autowired
    private ParentService parentService;
    
    @GetMapping("/profile/{userId}")
    public ResponseEntity<?> getProfile(@PathVariable Long userId) {
        try {
            Parent parent = parentService.getParentProfile(userId);
            return ResponseEntity.ok(parent);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
    
    @PutMapping("/profile/{userId}")
    public ResponseEntity<?> updateProfile(@PathVariable Long userId,
                                         @RequestBody Map<String, Object> requestData) {
        try {
            // Extract parent data
            @SuppressWarnings("unchecked")
            Map<String, Object> parentData = (Map<String, Object>) requestData.get("parent");
            
            Parent updatedParent = new Parent();
            updatedParent.setFirstName((String) parentData.get("firstName"));
            updatedParent.setLastName((String) parentData.get("lastName"));
            updatedParent.setPhone((String) parentData.get("phone"));
            updatedParent.setAddress((String) parentData.get("address"));
            updatedParent.setOccupation((String) parentData.get("occupation"));
            
            if (parentData.get("annualIncome") != null) {
                updatedParent.setAnnualIncome(java.math.BigDecimal.valueOf(Double.valueOf(parentData.get("annualIncome").toString())));
            }
            
            if (parentData.get("maritalStatus") != null) {
                updatedParent.setMaritalStatus(Parent.MaritalStatus.valueOf((String) parentData.get("maritalStatus")));
            }
            
            Parent parent = parentService.updateParentProfile(userId, updatedParent);
            return ResponseEntity.ok(parent);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
    
    @PutMapping("/password/{userId}")
    public ResponseEntity<?> changePassword(@PathVariable Long userId,
                                          @Valid @RequestBody PasswordChangeRequest request) {
        try {
            parentService.updatePassword(userId, 
                                       request.getCurrentPassword(), 
                                       request.getNewPassword());
            return ResponseEntity.ok(new MessageResponse("Password updated successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
}

