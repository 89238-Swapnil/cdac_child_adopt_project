package com.adoption.service;

// IMPORT THE NEW DTO CLASS
import com.adoption.dto.ParentProfileUpdateRequest;

import com.adoption.entity.Parent;
import com.adoption.entity.User;
import com.adoption.repository.ParentRepository;
import com.adoption.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class ParentService {
    
    @Autowired
    private ParentRepository parentRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public Optional<Parent> findByUserId(Long userId) {
        return parentRepository.findByUserId(userId);
    }
    
    public Parent getParentProfile(Long userId) {
        return parentRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Parent profile not found for user ID: " + userId));
    }
    
    // =================== THIS IS THE CORRECTED METHOD ===================
    @Transactional
    public Parent updateParentProfile(Long userId, ParentProfileUpdateRequest request) { // <-- USE THE DTO
        // 1. Find the existing parent from the database
        Parent existingParent = getParentProfile(userId);
        
        // 2. Map the data from the DTO to the existing entity
        existingParent.setFirstName(request.getFirstName());
        existingParent.setLastName(request.getLastName());
        existingParent.setPhone(request.getPhone());
        existingParent.setAddress(request.getAddress());
        existingParent.setOccupation(request.getOccupation());
        existingParent.setAnnualIncome(request.getAnnualIncome());
        existingParent.setMaritalStatus(request.getMaritalStatus());
        existingParent.setDateOfBirth(request.getDateOfBirth());
        
        // 3. Save the updated entity
        return parentRepository.save(existingParent);
    }
    // =====================================================================
    
    @Transactional
    public void updatePassword(Long userId, String currentPassword, String newPassword) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // IMPORTANT: You should be using a password encoder here, not plain text!
        // Example: if (!passwordEncoder.matches(currentPassword, user.getPassword())) { ... }
        if (!currentPassword.equals(user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }
        
        // Example: user.setPassword(passwordEncoder.encode(newPassword));
        user.setPassword(newPassword);
        userRepository.save(user);
    }
    
    @Transactional
    public void updateProfilePhoto(Long userId, String photoPath) {
        Parent parent = getParentProfile(userId);
        parent.setProfilePhoto(photoPath);
        parentRepository.save(parent);
    }
}
