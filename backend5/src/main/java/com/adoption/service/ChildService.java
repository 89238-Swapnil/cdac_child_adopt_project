package com.adoption.service;

import com.adoption.entity.Child;
import com.adoption.entity.Orphanage;
import com.adoption.repository.ChildRepository;
import com.adoption.repository.OrphanageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ChildService {
    
    @Autowired
    private ChildRepository childRepository;
    
    @Autowired
    private OrphanageRepository orphanageRepository;
    
    public List<Child> getAllAvailableChildren() {
        return childRepository.findAllAvailableChildren();
    }
    
    public List<Child> getChildrenByOrphanage(Long orphanageId) {
        return childRepository.findByOrphanageId(orphanageId);
    }
    
    public List<Child> getAvailableChildrenByOrphanage(Long orphanageId) {
        return childRepository.findAvailableChildrenByOrphanage(orphanageId);
    }
    
    public List<Child> getChildrenByOrphanageUser(Long userId) {
        Orphanage orphanage = orphanageRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Orphanage not found"));
        return childRepository.findByOrphanage(orphanage);
    }
    
    public Optional<Child> findById(Long id) {
        return childRepository.findById(id);
    }
    
    public Child getChildById(Long id) {
        return childRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Child not found"));
    }
    
    @Transactional
    public Child addChild(Long userId, Child child) {
        Orphanage orphanage = orphanageRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Orphanage not found"));
        
        child.setOrphanage(orphanage);
        child.setIsAvailable(true);
        
        return childRepository.save(child);
    }
    
    @Transactional
    public Child updateChild(Long userId, Long childId, Child updatedChild) {
        Orphanage orphanage = orphanageRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Orphanage not found"));
        
        Child child = childRepository.findById(childId)
                .orElseThrow(() -> new RuntimeException("Child not found"));
        
        // Verify that the child belongs to this orphanage
        if (!child.getOrphanage().getId().equals(orphanage.getId())) {
            throw new RuntimeException("Child does not belong to this orphanage");
        }
        
        child.setFirstName(updatedChild.getFirstName());
        child.setLastName(updatedChild.getLastName());
        child.setAge(updatedChild.getAge());
        child.setGender(updatedChild.getGender());
        child.setDateOfBirth(updatedChild.getDateOfBirth());
        child.setHealthStatus(updatedChild.getHealthStatus());
        child.setDescription(updatedChild.getDescription());
        child.setSpecialNeeds(updatedChild.getSpecialNeeds());
        child.setAdmissionDate(updatedChild.getAdmissionDate());
        
        return childRepository.save(child);
    }
    
    @Transactional
    public void deleteChild(Long userId, Long childId) {
        Orphanage orphanage = orphanageRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Orphanage not found"));
        
        Child child = childRepository.findById(childId)
                .orElseThrow(() -> new RuntimeException("Child not found"));
        
        // Verify that the child belongs to this orphanage
        if (!child.getOrphanage().getId().equals(orphanage.getId())) {
            throw new RuntimeException("Child does not belong to this orphanage");
        }
        
        childRepository.delete(child);
    }
    
    @Transactional
    public void updateChildPhoto(Long userId, Long childId, String photoPath) {
        Orphanage orphanage = orphanageRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Orphanage not found"));
        
        Child child = childRepository.findById(childId)
                .orElseThrow(() -> new RuntimeException("Child not found"));
        
        // Verify that the child belongs to this orphanage
        if (!child.getOrphanage().getId().equals(orphanage.getId())) {
            throw new RuntimeException("Child does not belong to this orphanage");
        }
        
        child.setPhoto(photoPath);
        childRepository.save(child);
    }
    
    @Transactional
    public void updateChildAvailability(Long userId, Long childId, Boolean isAvailable) {
        Orphanage orphanage = orphanageRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Orphanage not found"));
        
        Child child = childRepository.findById(childId)
                .orElseThrow(() -> new RuntimeException("Child not found"));
        
        // Verify that the child belongs to this orphanage
        if (!child.getOrphanage().getId().equals(orphanage.getId())) {
            throw new RuntimeException("Child does not belong to this orphanage");
        }
        
        child.setIsAvailable(isAvailable);
        childRepository.save(child);
    }
}

