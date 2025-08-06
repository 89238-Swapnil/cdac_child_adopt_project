package com.adoption.service;

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
    public Orphanage updateOrphanageProfile(Long userId, Orphanage updatedOrphanage) {
        Orphanage orphanage = getOrphanageProfile(userId);
        
        orphanage.setName(updatedOrphanage.getName());
        orphanage.setAddress(updatedOrphanage.getAddress());
        orphanage.setPhone(updatedOrphanage.getPhone());
        orphanage.setLicenseNumber(updatedOrphanage.getLicenseNumber());
        orphanage.setCapacity(updatedOrphanage.getCapacity());
        orphanage.setEstablishedDate(updatedOrphanage.getEstablishedDate());
        orphanage.setDescription(updatedOrphanage.getDescription());
        orphanage.setContactPerson(updatedOrphanage.getContactPerson());
        
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

