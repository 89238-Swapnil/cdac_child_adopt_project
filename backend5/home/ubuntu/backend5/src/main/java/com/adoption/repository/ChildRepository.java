package com.adoption.repository;

import com.adoption.entity.Child;
import com.adoption.entity.Orphanage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChildRepository extends JpaRepository<Child, Long> {
    
    List<Child> findByOrphanage(Orphanage orphanage);
    
    List<Child> findByOrphanageId(Long orphanageId);
    
    List<Child> findByIsAvailable(Boolean isAvailable);
    
    List<Child> findByOrphanageIdAndIsAvailable(Long orphanageId, Boolean isAvailable);
    
    @Query("SELECT c FROM Child c WHERE c.isAvailable = true")
    List<Child> findAllAvailableChildren();
    
    @Query("SELECT c FROM Child c WHERE c.orphanage.id = :orphanageId AND c.isAvailable = true")
    List<Child> findAvailableChildrenByOrphanage(@Param("orphanageId") Long orphanageId);
}

