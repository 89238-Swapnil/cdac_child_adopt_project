package com.adoption.Repository;

import com.adoption.entity.Orphanage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface OrphanageRepository extends JpaRepository<Orphanage, Long> {
    Optional<Orphanage> findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByRegistrationNumber(String registrationNumber); // Now valid
}