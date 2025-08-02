package com.adoption.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.adoption.entity.AdoptionRequest;

import java.util.List;

public interface AdoptionRequestRepository extends JpaRepository<AdoptionRequest, Long> {
    List<AdoptionRequest> findByParentId(Long parentId);
    List<AdoptionRequest> findByChildOrphanageId(Long orphanageId);
    List<AdoptionRequest> findByChildId(Long childId);
}