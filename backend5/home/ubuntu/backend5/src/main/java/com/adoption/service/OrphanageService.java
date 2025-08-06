package com.adoption.service;

import com.adoption.dto.OrphanageProfileUpdateRequest; // Import the new DTO
import com.adoption.entity.Orphanage;
import com.adoption.entity.User;
import com.adoption.repository.OrphanageRepository;
import com.adoption.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class OrphanageService {
    
    @Autowired
    private OrphanageRepository orphanageRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public List<Orphanage> getAllOrphanages() {
        return orphanageRepository.findAll();
    }
    
    public Optional<Orphanage> findByUserId(Long userId) {
        return orphanageRepository.findByUserId(userId);
    }
    
    public Orphanage getOrphanageProfile(Long userId) {
        return orphanageRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Orphanage profile not found"));
    }
    
    public Optional<Orphanage> findById(Long id) {
        return orphanageRepository.findById(id);
    }
    
    @Transactional
    public Orphanage updateOrphanageProfile(Long userId, OrphanageProfileUpdateRequest request) { // Use the DTO
        Orphanage orphanage = getOrphanageProfile(userId);
        
        orphanage.setName(request.getName());
        orphanage.setAddress(request.getAddress());
        orphanage.setPhone(request.getPhone());
        orphanage.setLicenseNumber(request.getLicenseNumber());
        orphanage.setCapacity(request.getCapacity());
        orphanage.setDescription(request.getDescription());
        orphanage.setContactPerson(request.getContactPerson());
        
        return orphanageRepository.save(orphanage);
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
        Orphanage orphanage = getOrphanageProfile(userId);
        orphanage.setProfilePhoto(photoPath);
        orphanageRepository.save(orphanage);
    }
}

