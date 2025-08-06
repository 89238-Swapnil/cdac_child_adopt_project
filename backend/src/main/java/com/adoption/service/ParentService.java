package com.adoption.service;

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
                .orElseThrow(() -> new RuntimeException("Parent profile not found"));
    }
    
    @Transactional
    public Parent updateParentProfile(Long userId, Parent updatedParent) {
        Parent parent = getParentProfile(userId);
        
        parent.setFirstName(updatedParent.getFirstName());
        parent.setLastName(updatedParent.getLastName());
        parent.setPhone(updatedParent.getPhone());
        parent.setAddress(updatedParent.getAddress());
        parent.setOccupation(updatedParent.getOccupation());
        parent.setAnnualIncome(updatedParent.getAnnualIncome());
        parent.setMaritalStatus(updatedParent.getMaritalStatus());
        parent.setDateOfBirth(updatedParent.getDateOfBirth());
        
        return parentRepository.save(parent);
    }
    
    @Transactional
    public void updatePassword(Long userId, String currentPassword, String newPassword) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (!currentPassword.equals(user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }
        
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

