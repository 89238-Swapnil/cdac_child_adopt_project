package com.adoption.controller;

import com.adoption.dto.MessageResponse;
import com.adoption.entity.Child;
import com.adoption.service.ChildService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
            
            Child savedChild = childService.addChild(orphanageUserId, child);
            return ResponseEntity.ok(savedChild);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
    
    @PutMapping("/{id}")
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
            
            Child child = childService.updateChild(orphanageUserId, id, updatedChild);
            return ResponseEntity.ok(child);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
    
    @DeleteMapping("/{id}")
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

