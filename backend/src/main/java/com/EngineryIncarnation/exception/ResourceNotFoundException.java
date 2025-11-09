package com.willdev.tallermanager.exception;

public class ResourceNotFoundException extends RuntimeException {
    
    public ResourceNotFoundException(String mensaje) {
        super(mensaje);
    }
}
