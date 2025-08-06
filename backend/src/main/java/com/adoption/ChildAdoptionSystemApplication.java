package com.adoption;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class ChildAdoptionSystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(ChildAdoptionSystemApplication.class, args);
    }
}

