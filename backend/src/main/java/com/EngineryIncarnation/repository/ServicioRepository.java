package com.willdev.tallermanager.repository;

import com.willdev.tallermanager.entity.Servicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServicioRepository extends JpaRepository<Servicio, Long> {
    
    List<Servicio> findByDisponible(Boolean disponible);
    
    List<Servicio> findByCategoria(String categoria);
    
    List<Servicio> findByNombreContainingIgnoreCase(String nombre);
}
