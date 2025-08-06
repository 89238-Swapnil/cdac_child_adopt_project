package com.adoption.controller;

import com.adoption.dto.MessageResponse;
import com.adoption.dto.PasswordChangeRequest;
import com.adoption.dto.ParentProfileUpdateRequest; // Import the new DTO
import com.adoption.entity.Parent;
import com.adoption.service.ParentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// Remove the unused Map import
// import java.util.Map;

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
                                         @Valid @RequestBody ParentProfileUpdateRequest request) { // Use the DTO
        try {
            Parent updatedParent = parentService.updateParentProfile(userId, request);
            return ResponseEntity.ok(updatedParent);
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


