package com.willdev.tallermanager.service;

import com.willdev.tallermanager.entity.Reserva;
import com.willdev.tallermanager.entity.Servicio;
import com.willdev.tallermanager.entity.Usuario;
import com.willdev.tallermanager.exception.ResourceNotFoundException;
import com.willdev.tallermanager.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private ServicioService servicioService;

    public List<Reserva> obtenerTodas() {
        return reservaRepository.findAll();
    }

    public Reserva obtenerPorId(Long id) {
        return reservaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reserva no encontrada con id: " + id));
    }

    public Reserva crear(Reserva reserva) {
        // Validar que el usuario y servicio existan
        Usuario usuario = usuarioService.obtenerPorId(reserva.getUsuario().getId());
        Servicio servicio = servicioService.obtenerPorId(reserva.getServicio().getId());
        
        reserva.setUsuario(usuario);
        reserva.setServicio(servicio);
        
        return reservaRepository.save(reserva);
    }

    public Reserva actualizar(Long id, Reserva reservaActualizada) {
        Reserva reserva = obtenerPorId(id);
        
        reserva.setFecha(reservaActualizada.getFecha());
        reserva.setHora(reservaActualizada.getHora());
        reserva.setEstado(reservaActualizada.getEstado());
        reserva.setNotas(reservaActualizada.getNotas());
        
        if (reservaActualizada.getUsuario() != null) {
            Usuario usuario = usuarioService.obtenerPorId(reservaActualizada.getUsuario().getId());
            reserva.setUsuario(usuario);
        }
        
        if (reservaActualizada.getServicio() != null) {
            Servicio servicio = servicioService.obtenerPorId(reservaActualizada.getServicio().getId());
            reserva.setServicio(servicio);
        }
        
        return reservaRepository.save(reserva);
    }

    public void eliminar(Long id) {
        Reserva reserva = obtenerPorId(id);
        reservaRepository.delete(reserva);
    }

    public List<Reserva> obtenerPorUsuario(Long usuarioId) {
        return reservaRepository.findByUsuarioId(usuarioId);
    }

    public List<Reserva> obtenerPorFecha(LocalDate fecha) {
        return reservaRepository.findByFecha(fecha);
    }

    public List<Reserva> obtenerPorEstado(Reserva.EstadoReserva estado) {
        return reservaRepository.findByEstado(estado);
    }

    public Reserva cambiarEstado(Long id, Reserva.EstadoReserva nuevoEstado) {
        Reserva reserva = obtenerPorId(id);
        reserva.setEstado(nuevoEstado);
        return reservaRepository.save(reserva);
    }
}
