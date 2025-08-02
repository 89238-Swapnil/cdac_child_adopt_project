package com.adoption.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.adoption.entity.Child;

import java.util.List;

@Repository
public interface ChildRepository extends JpaRepository<Child, Long> {
    List<Child> findByStatus(String status);
    List<Child> findByOrphanageId(Long orphanageId);
}