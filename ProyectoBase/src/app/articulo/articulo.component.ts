import { ArticuloService } from './../service/artiuclo.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../service/categoria.service';
import { Articulo } from '../model/Articulo';
import { Categoria } from '../model/Categoria';
import Swal from 'sweetalert2';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-articulos',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {
  titulo: string = 'Artículos';
  listaDeArticulos: Articulo[] = [];
  listaDeCategorias: Categoria[] = [];
  newArticulo: Articulo = new Articulo();
  editMode: boolean = false;

  constructor(
    private articuloService: ArticuloService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.obtenerArticulos();
    this.obtenerCategorias();
  }
  
  obtenerArticulos(): void {
    this.articuloService.getArticulos().subscribe(
      (data: Articulo[]) => {
        this.listaDeArticulos = data;
      },
      (error) => {
        console.error('Error fetching articles', error);
      }
    );
  }

  obtenerCategorias(): void {
    this.categoriaService.getCategorias().subscribe(
      (data: Categoria[]) => {
        this.listaDeCategorias = data;
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }

  eliminar(articulo: Articulo): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.articuloService.eliminarArticulo(articulo.idArticulo).subscribe(
          () => {
            this.listaDeArticulos = this.listaDeArticulos.filter(a => a.idArticulo !== articulo.idArticulo);
            Swal.fire('Eliminado!', 'El artículo ha sido eliminado.', 'success');
          },
          (error) => {
            console.error('Error deleting article', error);
            Swal.fire('Error!', 'Hubo un error al eliminar el artículo.', 'error');
          }
        );
      }
    });
  }
  
  guardarArticulo(): void {
    if (this.editMode) {
      this.articuloService.actualizarArticulo(this.newArticulo.idArticulo, this.newArticulo).subscribe(
        (data) => {
          this.obtenerArticulos();
          this.newArticulo = new Articulo();
          this.editMode = false;
          Swal.fire('Saved!', '', 'success');
        },
        (error) => {
          console.error('Error updating category', error);
        }
      );
    } else {
      this.articuloService.crearArticulo(this.newArticulo).subscribe(
        (data) => {
          this.listaDeArticulos.push(data);
          this.newArticulo = new Articulo();
          Swal.fire('Created!', '', 'success');
        },
        (error) => {
          console.error('Error creating category', error);
        }
      );
    }
  }

  editarArticulo(articulo: Articulo): void {
    this.newArticulo = { ...articulo };
    this.editMode = true;
  }

  agregarArticulo(): void {
    this.newArticulo = new Articulo();
    this.editMode = false;
  }
}