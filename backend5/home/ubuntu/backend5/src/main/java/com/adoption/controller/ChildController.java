package com.adoption.controller;

import com.adoption.dto.*;
import com.adoption.entity.Child;
import com.adoption.service.ChildService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
// Remove the unused Map import
// import java.util.Map;

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
    public ResponseEntity<?> addChild(@Valid @RequestBody ChildCreateRequest request) { // Use the DTO
        try {
            Child savedChild = childService.addChild(request);
            return ResponseEntity.ok(savedChild);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateChild(@Valid @RequestBody ChildUpdateRequest request,
                                       @PathVariable Long id) { // Use the DTO
        try {
            Child child = childService.updateChild(id, request);
            return ResponseEntity.ok(child);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteChild(@Valid @RequestBody ChildDeleteRequest request,
                                       @PathVariable Long id) { // Use the DTO
        try {
            childService.deleteChild(id, request);
            return ResponseEntity.ok(new MessageResponse("Child deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
    
    @PutMapping("/{id}/availability")
    public ResponseEntity<?> updateChildAvailability(@Valid @RequestBody ChildAvailabilityUpdateRequest request,
                                                   @PathVariable Long id) { // Use the DTO
        try {
            childService.updateChildAvailability(id, request);
            return ResponseEntity.ok(new MessageResponse("Child availability updated successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
}

