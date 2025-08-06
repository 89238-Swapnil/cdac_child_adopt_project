package com.adoption.repository;

import com.adoption.entity.Parent;
import com.adoption.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ParentRepository extends JpaRepository<Parent, Long> {
    
    Optional<Parent> findByUser(User user);
    
    Optional<Parent> findByUserId(Long userId);
    
    boolean existsByUserId(Long userId);
}

