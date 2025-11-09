package com.willdev.tallermanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TallerMotosApplication {

    public static void main(String[] args) {
        SpringApplication.run(TallerMotosApplication.class, args);
        System.out.println("🏍️  Taller Motos API corriendo en http://localhost:8080");
    }
}
