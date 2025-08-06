package com.adoption.repository;

import com.adoption.entity.AdoptionForm;
import com.adoption.entity.AdoptionRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdoptionFormRepository extends JpaRepository<AdoptionForm, Long> {
    
    Optional<AdoptionForm> findByAdoptionRequest(AdoptionRequest adoptionRequest);
    
    Optional<AdoptionForm> findByAdoptionRequestId(Long adoptionRequestId);
    
    boolean existsByAdoptionRequestId(Long adoptionRequestId);
}

