package com.adoption.dto;

import com.adoption.entity.User;

public class AuthResponse {
    
    private String token;
    private String type = Bearer;
    private Long id;
    private String email;
    private User.Role role;
    
     Constructors
    public AuthResponse() {}
    
    public AuthResponse(String token, Long id, String email, User.Role role) {
        this.token = token;
        this.id = id;
        this.email = email;
        this.role = role;
    }
    
     Getters and Setters
    public String getToken() {
        return token;
    }
    
    public void setToken(String token) {
        this.token = token;
    }
    
    public String getType() {
        return type;
    }
    
    public void setType(String type) {
        this.type = type;
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public User.Role getRole() {
        return role;
    }
    
    public void setRole(User.Role role) {
        this.role = role;
    }
}

