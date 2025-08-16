package com.adoption.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        try {
            final String authorizationHeader = request.getHeader("Authorization");
            String requestURI = request.getRequestURI();
            
            logger.debug("Processing request: " + requestURI + " with Authorization header: " + 
                        (authorizationHeader != null ? authorizationHeader.substring(0, Math.min(20, authorizationHeader.length())) + "..." : "null"));

            String username = null;
            String jwt = null;

            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                jwt = authorizationHeader.substring(7);
                try {
                    username = jwtTokenUtil.extractUsername(jwt);
                    logger.debug("Extracted username from JWT: " + username);
                } catch (Exception e) {
                    logger.warn("JWT Token is invalid for request " + requestURI + ": " + e.getMessage());
                }
            }

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                try {
                    UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
                    logger.debug("Loaded user details for: " + username);

                    if (jwtTokenUtil.validateToken(jwt, userDetails)) {
                        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                                userDetails, null, userDetails.getAuthorities());
                        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authToken);
                        logger.debug("Authentication set for user: " + username);
                    } else {
                        logger.warn("JWT token validation failed for user: " + username);
                    }
                } catch (Exception e) {
                    logger.error("Error processing JWT authentication for user " + username + ": " + e.getMessage(), e);
                }
            } else if (username == null) {
                logger.debug("No JWT token found for request: " + requestURI);
            }

            chain.doFilter(request, response);
            
        } catch (Exception e) {
            logger.error("Unexpected error in JWT filter for request " + request.getRequestURI() + ": " + e.getMessage(), e);
            // Don't commit response here, let the error handling continue
            chain.doFilter(request, response);
        }
    }
}
