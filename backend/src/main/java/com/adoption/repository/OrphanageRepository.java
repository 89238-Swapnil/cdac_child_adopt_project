package com.adoption.repository;

import com.adoption.model.Orphanage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrphanageRepository extends JpaRepository<Orphanage, Long> {
    Optional<Orphanage> findByEmail(String email);
}
