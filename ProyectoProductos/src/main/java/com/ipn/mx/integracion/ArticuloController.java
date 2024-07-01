package com.ipn.mx.integracion;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.ipn.mx.modelo.entidades.Articulo;
import com.ipn.mx.modelo.entidades.Categoria;
import com.ipn.mx.servicios.ArticuloService;
import com.ipn.mx.servicios.CategoriaService;

@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("/apiCategoriaArticulo")
public class ArticuloController {

    @Autowired
    private ArticuloService service;
    
    @Autowired
    private CategoriaService categoriaService;

    @GetMapping("/articulos")
    @ResponseStatus(HttpStatus.OK)
    public List<Articulo> mostrarArticulos() {
        return service.findAll();
    }

    @GetMapping("/articulos/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Articulo> mostrarArticulo(@PathVariable("id") Long id) {
        Articulo articulo = service.findById(id);
        if (articulo != null) {
            // Ensure the associated category is fetched and included in the response
            articulo.getCategoria();
            return ResponseEntity.ok(articulo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/articulos/categoria/{idCategoria}")
    @ResponseStatus(HttpStatus.OK)
    public List<Articulo> mostrarArticulosPorCategoria(@PathVariable("idCategoria") Long idCategoria) {
        return service.findByCategoriaId(idCategoria);
    }

    @PostMapping("/articulos")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<String> crearArticulo(@RequestBody Articulo articulo) {
        // Validate the request
        if (articulo.getNombreArticulo() == null || articulo.getNombreArticulo().isEmpty()) {
            return ResponseEntity.badRequest().body("El nombre del artículo es obligatorio");
        }
        
        // Ensure the associated category exists and has an id
        if (articulo.getCategoria() == null || articulo.getCategoria().getIdCategoria() == null) {
            return ResponseEntity.badRequest().body("Categoria must have an id");
        }

        Categoria categoria = categoriaService.findById(articulo.getCategoria().getIdCategoria());
        if (categoria == null) {
            return ResponseEntity.badRequest().body("Categoria with id " + articulo.getCategoria().getIdCategoria() + " does not exist");
        }

        articulo.setCategoria(categoria);

        // Save the article
        try {
            Articulo savedArticulo = service.save(articulo);
            return ResponseEntity.status(HttpStatus.CREATED).body("Articulo creado con ID: " + savedArticulo.getIdArticulo());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al crear el artículo: " + e.getMessage());
        }
    }

    @DeleteMapping("/articulos/{id}")
    public ResponseEntity<String> eliminarArticulo(@PathVariable("id") Long id) {
        Articulo articulo = service.findById(id);
        if (articulo != null) {
            try {
                service.deleteById(id);
                return ResponseEntity.ok("Articulo eliminado con ID: " + id);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al eliminar el artículo: " + e.getMessage());
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
