package com.adoption.service;

import com.adoption.dto.*;
import com.adoption.entity.*;
import com.adoption.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ParentRepository parentRepository;
    
    @Autowired
    private OrphanageRepository orphanageRepository;
    
    public AuthResponse authenticateUser(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Simple password check (in production, you'd want to hash passwords)
        if (!user.getPassword().equals(loginRequest.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        
        return new AuthResponse("simple-token", user.getId(), user.getEmail(), user.getRole());
    }
    
    @Transactional
    public AuthResponse registerParent(ParentRegistrationRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email is already taken!");
        }
        
        // Create user
        User user = new User(
            request.getEmail(),
            request.getPassword(), // Store plain password for simplicity
            User.Role.PARENT
        );
        user = userRepository.save(user);
        
        // Create parent profile
        Parent parent = new Parent(user, request.getFirstName(), request.getLastName());
        parent.setPhone(request.getPhone());
        parent.setAddress(request.getAddress());
        parent.setOccupation(request.getOccupation());
        parent.setAnnualIncome(request.getAnnualIncome());
        parent.setMaritalStatus(request.getMaritalStatus());
        parent.setDateOfBirth(request.getDateOfBirth());
        
        parentRepository.save(parent);
        
        return new AuthResponse("simple-token", user.getId(), user.getEmail(), user.getRole());
    }
    
    @Transactional
    public AuthResponse registerOrphanage(OrphanageRegistrationRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email is already taken!");
        }
        
        if (request.getLicenseNumber() != null && 
            orphanageRepository.existsByLicenseNumber(request.getLicenseNumber())) {
            throw new RuntimeException("License number is already registered!");
        }
        
        // Create user
        User user = new User(
            request.getEmail(),
            request.getPassword(), // Store plain password for simplicity
            User.Role.ORPHANAGE
        );
        user = userRepository.save(user);
        
        // Create orphanage profile
        Orphanage orphanage = new Orphanage(user, request.getName(), request.getAddress());
        orphanage.setPhone(request.getPhone());
        orphanage.setLicenseNumber(request.getLicenseNumber());
        orphanage.setCapacity(request.getCapacity());
        orphanage.setEstablishedDate(request.getEstablishedDate());
        orphanage.setDescription(request.getDescription());
        orphanage.setContactPerson(request.getContactPerson());
        
        orphanageRepository.save(orphanage);
        
        return new AuthResponse("simple-token", user.getId(), user.getEmail(), user.getRole());
    }
}

