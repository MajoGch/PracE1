package com.ipn.mx.servicios;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ipn.mx.modelo.entidades.Articulo;
import com.ipn.mx.modelo.repositorios.ArticuloRepository;

@Service
public class ArticuloService {

    @Autowired
    private ArticuloRepository repository;

    public List<Articulo> findAll() {
        return repository.findAll();
    }

    public Articulo findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Articulo save(Articulo articulo) {
        return repository.save(articulo);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public List<Articulo> findByCategoriaId(Long idCategoria) {
        return repository.findByCategoriaIdCategoria(idCategoria);
    }
}
