package com.adoption.controller;

import com.adoption.dto.*;
import com.adoption.service.AuthService;
import com.adoption.security.JwtTokenUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {
    
    @Autowired
    private AuthService authService;
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            System.out.println("Login attempt for email: " + loginRequest.getEmail());
            
            // Authenticate user with Spring Security
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );
            
            System.out.println("Authentication successful for: " + loginRequest.getEmail());
            
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String role = userDetails.getAuthorities().iterator().next().getAuthority().replace("ROLE_", "");
            
            System.out.println("User role: " + role);
            
            // Generate JWT token
            String token = jwtTokenUtil.generateToken(userDetails.getUsername(), role);
            System.out.println("JWT token generated successfully");
            
            // Get user details from service (this will return the existing response structure)
            AuthResponse authResponse = authService.authenticateUser(loginRequest);
            authResponse.setToken(token); // Replace the simple token with JWT token
            
            System.out.println("Login successful for user ID: " + authResponse.getId());
            
            return ResponseEntity.ok(authResponse);
        } catch (Exception e) {
            System.err.println("Login error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
    
    @PostMapping("/register/parent")
    public ResponseEntity<?> registerParent(@Valid @RequestBody ParentRegistrationRequest request) {
        try {
            AuthResponse authResponse = authService.registerParent(request);
            
            // Generate JWT token for newly registered user
            String token = jwtTokenUtil.generateToken(request.getEmail(), "PARENT");
            authResponse.setToken(token);
            
            return ResponseEntity.ok(authResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
    
    @PostMapping("/register/orphanage")
    public ResponseEntity<?> registerOrphanage(@Valid @RequestBody OrphanageRegistrationRequest request) {
        try {
            AuthResponse authResponse = authService.registerOrphanage(request);
            
            // Generate JWT token for newly registered user
            String token = jwtTokenUtil.generateToken(request.getEmail(), "ORPHANAGE");
            authResponse.setToken(token);
            
            return ResponseEntity.ok(authResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
    
    @GetMapping("/test")
    public ResponseEntity<?> testEndpoint() {
        return ResponseEntity.ok(new MessageResponse("Public endpoint accessible without authentication"));
    }
    
    @GetMapping("/test/authenticated")
    public ResponseEntity<?> testAuthenticatedEndpoint() {
        return ResponseEntity.ok(new MessageResponse("Protected endpoint accessible with valid JWT token"));
    }
}

