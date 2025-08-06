package com.adoption.service;

import com.adoption.dto.ChildAvailabilityUpdateRequest;
import com.adoption.dto.ChildCreateRequest;
import com.adoption.dto.ChildDeleteRequest;
import com.adoption.dto.ChildUpdateRequest;
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
    public Child addChild(ChildCreateRequest request) { // Use DTO
        Orphanage orphanage = orphanageRepository.findByUserId(request.getOrphanageUserId())
                .orElseThrow(() -> new RuntimeException("Orphanage not found"));
        
        Child child = new Child();
        child.setFirstName(request.getFirstName());
        child.setLastName(request.getLastName());
        child.setAge(request.getAge());
        child.setGender(request.getGender());
        child.setHealthStatus(request.getHealthStatus());
        child.setDescription(request.getDescription());
        child.setSpecialNeeds(request.getSpecialNeeds());
        
        child.setOrphanage(orphanage);
        child.setIsAvailable(true);
        
        return childRepository.save(child);
    }
    
    @Transactional
    public Child updateChild(Long childId, ChildUpdateRequest request) { // Use DTO
        Orphanage orphanage = orphanageRepository.findByUserId(request.getOrphanageUserId())
                .orElseThrow(() -> new RuntimeException("Orphanage not found"));
        
        Child child = childRepository.findById(childId)
                .orElseThrow(() -> new RuntimeException("Child not found"));
        
        // Verify that the child belongs to this orphanage
        if (!child.getOrphanage().getId().equals(orphanage.getId())) {
            throw new RuntimeException("Child does not belong to this orphanage");
        }
        
        child.setFirstName(request.getFirstName());
        child.setLastName(request.getLastName());
        child.setAge(request.getAge());
        child.setGender(request.getGender());
        child.setHealthStatus(request.getHealthStatus());
        child.setDescription(request.getDescription());
        child.setSpecialNeeds(request.getSpecialNeeds());
        // Note: DateOfBirth and AdmissionDate are not in ChildUpdateRequest, so they are not updated here.
        
        return childRepository.save(child);
    }
    
    @Transactional
    public void deleteChild(Long childId, ChildDeleteRequest request) { // Use DTO
        Orphanage orphanage = orphanageRepository.findByUserId(request.getOrphanageUserId())
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
    public void updateChildAvailability(Long childId, ChildAvailabilityUpdateRequest request) { // Use DTO
        Orphanage orphanage = orphanageRepository.findByUserId(request.getOrphanageUserId())
                .orElseThrow(() -> new RuntimeException("Orphanage not found"));
        
        Child child = childRepository.findById(childId)
                .orElseThrow(() -> new RuntimeException("Child not found"));
        
        // Verify that the child belongs to this orphanage
        if (!child.getOrphanage().getId().equals(orphanage.getId())) {
            throw new RuntimeException("Child does not belong to this orphanage");
        }
        
        child.setIsAvailable(request.getIsAvailable());
        childRepository.save(child);
    }
}


