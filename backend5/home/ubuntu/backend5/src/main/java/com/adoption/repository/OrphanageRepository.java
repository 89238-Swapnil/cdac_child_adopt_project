package com.adoption.repository;

import com.adoption.entity.Orphanage;
import com.adoption.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrphanageRepository extends JpaRepository<Orphanage, Long> {
    
    Optional<Orphanage> findByUser(User user);
    
    Optional<Orphanage> findByUserId(Long userId);
    
    boolean existsByUserId(Long userId);
    
    boolean existsByLicenseNumber(String licenseNumber);
}

