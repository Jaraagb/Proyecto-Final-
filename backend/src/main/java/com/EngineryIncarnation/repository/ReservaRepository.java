package com.willdev.tallermanager.repository;

import com.willdev.tallermanager.entity.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    
    List<Reserva> findByUsuarioId(Long usuarioId);
    
    List<Reserva> findByServicioId(Long servicioId);
    
    List<Reserva> findByFecha(LocalDate fecha);
    
    List<Reserva> findByEstado(Reserva.EstadoReserva estado);
    
    List<Reserva> findByFechaBetween(LocalDate fechaInicio, LocalDate fechaFin);
}
