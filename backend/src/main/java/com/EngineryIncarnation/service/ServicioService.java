package com.willdev.tallermanager.service;

import com.willdev.tallermanager.entity.Servicio;
import com.willdev.tallermanager.exception.ResourceNotFoundException;
import com.willdev.tallermanager.repository.ServicioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ServicioService {

    @Autowired
    private ServicioRepository servicioRepository;

    public List<Servicio> obtenerTodos() {
        return servicioRepository.findAll();
    }

    public Servicio obtenerPorId(Long id) {
        return servicioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Servicio no encontrado con id: " + id));
    }

    public Servicio crear(Servicio servicio) {
        return servicioRepository.save(servicio);
    }

    public Servicio actualizar(Long id, Servicio servicioActualizado) {
        Servicio servicio = obtenerPorId(id);
        
        servicio.setNombre(servicioActualizado.getNombre());
        servicio.setDescripcion(servicioActualizado.getDescripcion());
        servicio.setPrecio(servicioActualizado.getPrecio());
        servicio.setDuracionMinutos(servicioActualizado.getDuracionMinutos());
        servicio.setCategoria(servicioActualizado.getCategoria());
        servicio.setDisponible(servicioActualizado.getDisponible());
        
        return servicioRepository.save(servicio);
    }

    public void eliminar(Long id) {
        Servicio servicio = obtenerPorId(id);
        servicioRepository.delete(servicio);
    }

    public List<Servicio> obtenerDisponibles() {
        return servicioRepository.findByDisponible(true);
    }

    public List<Servicio> buscarPorNombre(String nombre) {
        return servicioRepository.findByNombreContainingIgnoreCase(nombre);
    }
}
