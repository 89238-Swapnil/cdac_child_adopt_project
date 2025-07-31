package com.adoption.repository;

import com.adoption.model.Child;
import com.adoption.model.Orphanage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChildRepository extends JpaRepository<Child, Long> {
    List<Child> findByOrphanage(Orphanage orphanage);
}
