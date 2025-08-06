package com.adoption.service;

import com.adoption.entity.*;
import com.adoption.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AdoptionRequestService {
    
    @Autowired
    private AdoptionRequestRepository adoptionRequestRepository;
    
    @Autowired
    private AdoptionFormRepository adoptionFormRepository;
    
    @Autowired
    private ParentRepository parentRepository;
    
    @Autowired
    private ChildRepository childRepository;
    
    @Autowired
    private OrphanageRepository orphanageRepository;
    
    public List<AdoptionRequest> getRequestsByParent(Long userId) {
        Parent parent = parentRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Parent not found"));
        return adoptionRequestRepository.findByParent(parent);
    }
    
    public List<AdoptionRequest> getRequestsByOrphanage(Long userId) {
        Orphanage orphanage = orphanageRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Orphanage not found"));
        return adoptionRequestRepository.findByOrphanageId(orphanage.getId());
    }
    
    public List<AdoptionRequest> getRequestsByOrphanageAndStatus(Long userId, AdoptionRequest.Status status) {
        Orphanage orphanage = orphanageRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Orphanage not found"));
        return adoptionRequestRepository.findByOrphanageIdAndStatus(orphanage.getId(), status);
    }
    
    public Optional<AdoptionRequest> findById(Long id) {
        return adoptionRequestRepository.findById(id);
    }
    
    public AdoptionRequest getRequestById(Long id) {
        return adoptionRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Adoption request not found"));
    }
    
    @Transactional
    public AdoptionRequest createAdoptionRequest(Long parentUserId, Long childId, String parentNotes) {
        Parent parent = parentRepository.findByUserId(parentUserId)
                .orElseThrow(() -> new RuntimeException("Parent not found"));
        
        Child child = childRepository.findById(childId)
                .orElseThrow(() -> new RuntimeException("Child not found"));
        
        if (!child.getIsAvailable()) {
            throw new RuntimeException("Child is not available for adoption");
        }
        
        // Check if request already exists
        if (adoptionRequestRepository.existsByParentAndChild(parent, child)) {
            throw new RuntimeException("Adoption request already exists for this child");
        }
        
        AdoptionRequest request = new AdoptionRequest(parent, child);
        request.setParentNotes(parentNotes);
        request.setStatus(AdoptionRequest.Status.PENDING);
        
        return adoptionRequestRepository.save(request);
    }
    
    @Transactional
    public AdoptionRequest createAdoptionRequestWithForm(Long parentUserId, Long childId, 
                                                       AdoptionForm adoptionForm, String parentNotes) {
        AdoptionRequest request = createAdoptionRequest(parentUserId, childId, parentNotes);
        
        adoptionForm.setAdoptionRequest(request);
        adoptionFormRepository.save(adoptionForm);
        
        return request;
    }
    
    @Transactional
    public AdoptionRequest updateRequestStatus(Long orphanageUserId, Long requestId, 
                                             AdoptionRequest.Status status, String orphanageNotes) {
        Orphanage orphanage = orphanageRepository.findByUserId(orphanageUserId)
                .orElseThrow(() -> new RuntimeException("Orphanage not found"));
        
        AdoptionRequest request = adoptionRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Adoption request not found"));
        
        // Verify that the request is for a child in this orphanage
        if (!request.getChild().getOrphanage().getId().equals(orphanage.getId())) {
            throw new RuntimeException("Request does not belong to this orphanage");
        }
        
        request.setStatus(status);
        request.setOrphanageNotes(orphanageNotes);
        request.setResponseDate(LocalDateTime.now());
        
        // If approved, mark child as unavailable
        if (status == AdoptionRequest.Status.APPROVED) {
            Child child = request.getChild();
            child.setIsAvailable(false);
            childRepository.save(child);
        }
        
        return adoptionRequestRepository.save(request);
    }
    
    @Transactional
    public void cancelRequest(Long parentUserId, Long requestId) {
        Parent parent = parentRepository.findByUserId(parentUserId)
                .orElseThrow(() -> new RuntimeException("Parent not found"));
        
        AdoptionRequest request = adoptionRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Adoption request not found"));
        
        // Verify that the request belongs to this parent
        if (!request.getParent().getId().equals(parent.getId())) {
            throw new RuntimeException("Request does not belong to this parent");
        }
        
        // Only allow cancellation if request is pending
        if (request.getStatus() != AdoptionRequest.Status.PENDING) {
            throw new RuntimeException("Cannot cancel request that is not pending");
        }
        
        adoptionRequestRepository.delete(request);
    }
    
    public Optional<AdoptionForm> getAdoptionForm(Long requestId) {
        return adoptionFormRepository.findByAdoptionRequestId(requestId);
    }
    
    @Transactional
    public AdoptionForm updateAdoptionForm(Long parentUserId, Long requestId, AdoptionForm updatedForm) {
        Parent parent = parentRepository.findByUserId(parentUserId)
                .orElseThrow(() -> new RuntimeException("Parent not found"));
        
        AdoptionRequest request = adoptionRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Adoption request not found"));
        
        // Verify that the request belongs to this parent
        if (!request.getParent().getId().equals(parent.getId())) {
            throw new RuntimeException("Request does not belong to this parent");
        }
        
        AdoptionForm form = adoptionFormRepository.findByAdoptionRequestId(requestId)
                .orElse(new AdoptionForm(request));
        
        // Update form fields
        form.setReasonForAdoption(updatedForm.getReasonForAdoption());
        form.setPreviousChildren(updatedForm.getPreviousChildren());
        form.setHousingType(updatedForm.getHousingType());
        form.setHouseholdIncome(updatedForm.getHouseholdIncome());
        form.setEmploymentStatus(updatedForm.getEmploymentStatus());
        form.setReferencesContact(updatedForm.getReferencesContact());
        form.setMedicalHistory(updatedForm.getMedicalHistory());
        form.setCriminalBackgroundCheck(updatedForm.getCriminalBackgroundCheck());
        form.setHomeStudyCompleted(updatedForm.getHomeStudyCompleted());
        form.setAdditionalDocuments(updatedForm.getAdditionalDocuments());
        
        return adoptionFormRepository.save(form);
    }
}

