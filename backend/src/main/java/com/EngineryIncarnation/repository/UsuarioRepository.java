package com.willdev.tallermanager.repository;

import com.willdev.tallermanager.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    Optional<Usuario> findByEmail(String email);
    
    List<Usuario> findByRol(Usuario.RolUsuario rol);
    
    List<Usuario> findByActivo(Boolean activo);
    
    boolean existsByEmail(String email);
}
