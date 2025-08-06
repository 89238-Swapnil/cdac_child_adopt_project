package com.adoption.repository;

import com.adoption.entity.AdoptionRequest;
import com.adoption.entity.Child;
import com.adoption.entity.Parent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdoptionRequestRepository extends JpaRepository<AdoptionRequest, Long> {
    
    List<AdoptionRequest> findByParent(Parent parent);
    
    List<AdoptionRequest> findByChild(Child child);
    
    List<AdoptionRequest> findByParentId(Long parentId);
    
    List<AdoptionRequest> findByChildId(Long childId);
    
    Optional<AdoptionRequest> findByParentAndChild(Parent parent, Child child);
    
    List<AdoptionRequest> findByStatus(AdoptionRequest.Status status);
    
    @Query("SELECT ar FROM AdoptionRequest ar WHERE ar.child.orphanage.id = :orphanageId")
    List<AdoptionRequest> findByOrphanageId(@Param("orphanageId") Long orphanageId);
    
    @Query("SELECT ar FROM AdoptionRequest ar WHERE ar.child.orphanage.id = :orphanageId AND ar.status = :status")
    List<AdoptionRequest> findByOrphanageIdAndStatus(@Param("orphanageId") Long orphanageId, 
                                                     @Param("status") AdoptionRequest.Status status);
    
    boolean existsByParentAndChild(Parent parent, Child child);
}

