package com.adoption.controller;

import com.adoption.dto.MessageResponse;
import com.adoption.dto.PasswordChangeRequest;
import com.adoption.dto.OrphanageProfileUpdateRequest; // Import the new DTO
import com.adoption.entity.Orphanage;
import com.adoption.service.OrphanageService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
// Remove the unused Map import
// import java.util.Map;

@RestController
@RequestMapping("/orphanage")
@CrossOrigin(origins = "*", maxAge = 3600)
public class OrphanageController {
    
    @Autowired
    private OrphanageService orphanageService;
    
    @GetMapping("/all")
    public ResponseEntity<?> getAllOrphanages() {
        try {
            List<Orphanage> orphanages = orphanageService.getAllOrphanages();
            return ResponseEntity.ok(orphanages);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
    
    @GetMapping("/profile/{userId}")
    public ResponseEntity<?> getProfile(@PathVariable Long userId) {
        try {
            Orphanage orphanage = orphanageService.getOrphanageProfile(userId);
            return ResponseEntity.ok(orphanage);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
    
    @PutMapping("/profile/{userId}")
    public ResponseEntity<?> updateProfile(@PathVariable Long userId,
                                         @Valid @RequestBody OrphanageProfileUpdateRequest request) { // Use the DTO
        try {
            Orphanage updatedOrphanage = orphanageService.updateOrphanageProfile(userId, request);
            return ResponseEntity.ok(updatedOrphanage);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
    
    @PutMapping("/password/{userId}")
    public ResponseEntity<?> changePassword(@PathVariable Long userId,
                                          @Valid @RequestBody PasswordChangeRequest request) {
        try {
            orphanageService.updatePassword(userId, 
                                          request.getCurrentPassword(), 
                                          request.getNewPassword());
            return ResponseEntity.ok(new MessageResponse("Password updated successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getOrphanageById(@PathVariable Long id) {
        try {
            Orphanage orphanage = orphanageService.findById(id)
                    .orElseThrow(() -> new RuntimeException("Orphanage not found"));
            return ResponseEntity.ok(orphanage);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
}

