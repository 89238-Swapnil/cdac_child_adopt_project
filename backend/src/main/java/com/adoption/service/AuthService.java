package com.adoption.service;

import com.adoption.dto.LoginRequest;
import com.adoption.dto.SignupRequest;
import com.adoption.model.Orphanage;
import com.adoption.model.Parent;
import com.adoption.repository.OrphanageRepository;
import com.adoption.repository.ParentRepository;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;


import jakarta.validation.Valid;

import com.adoption.config.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final ParentRepository parentRepo;
    private final OrphanageRepository orphanageRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public String signup(SignupRequest request) {
        String hashedPassword = passwordEncoder.encode(request.getPassword());

        if (request.getUserType().equalsIgnoreCase("parent")) {
            Parent parent = Parent.builder()
                    .fullName(request.getFullName())
                    .email(request.getEmail())
                    .password(hashedPassword)
                    .phone(request.getPhone())
                    .address(request.getAddress())
                    .build();
            parentRepo.save(parent);
        } else if (request.getUserType().equalsIgnoreCase("orphanage")) {
            Orphanage orphanage = Orphanage.builder()
                    .orphanageName(request.getOrphanageName())
                    .adminName(request.getAdminName())
                    .email(request.getEmail())
                    .password(hashedPassword)
                    .location(request.getLocation())
                    .contactNumber(request.getContactNumber())
                    .build();
            orphanageRepo.save(orphanage);
        } else {
            throw new IllegalArgumentException("Invalid userType");
        }

        return "Signup successful!";
    }

    public String login(LoginRequest request) {
        String email = request.getEmail();
        String password = request.getPassword();

        return parentRepo.findByEmail(email)
                .filter(p -> passwordEncoder.matches(password, p.getPassword()))
                .map(p -> jwtUtil.generateToken(email, "parent"))
                .or(() -> orphanageRepo.findByEmail(email)
                        .filter(o -> passwordEncoder.matches(password, o.getPassword()))
                        .map(o -> jwtUtil.generateToken(email, "orphanage")))
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));
    }
}
