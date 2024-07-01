package com.ipn.mx.modelo.repositorios;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ipn.mx.modelo.entidades.Articulo;

@Repository
public interface ArticuloRepository extends JpaRepository<Articulo, Long> {
    List<Articulo> findByCategoriaIdCategoria(Long idCategoria);
}
