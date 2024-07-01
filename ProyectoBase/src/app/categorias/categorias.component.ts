import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../service/categoria.service';
import { Categoria } from '../model/Categoria';
import Swal from 'sweetalert2';
import { HttpClientModule } from '@angular/common/http';  // Importa HttpClientModule

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  titulo: string = 'Categorías';
  listaDeCategorias: Categoria[] = [];
  newCategoria: Categoria = new Categoria();
  editMode: boolean = false;

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    console.log('Component initialized');
    this.obtenerCategorias();
  }
  
  obtenerCategorias(): void {
    console.log('Fetching categories');
    this.categoriaService.getCategorias().subscribe(
      (data: Categoria[]) => {
        console.log('Categories fetched', data);
        this.listaDeCategorias = data;
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }
  
  eliminar(categoria: Categoria): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaService.eliminarCategoria(categoria.idCategoria).subscribe(
          () => {
            // Actualiza la lista de categorías
            this.listaDeCategorias = this.listaDeCategorias.filter(c => c.idCategoria !== categoria.idCategoria);
            Swal.fire('Deleted!', 'The category has been deleted.', 'success');
          },
          (error) => {
            console.error('Error deleting category', error);
            Swal.fire('Error!', 'There was an error deleting the category.', 'error');
          }
        );
      }
    });
  }
  
  guardarCategoria(): void {
    if (this.editMode) {
      this.categoriaService.actualizarCategoria(this.newCategoria.idCategoria, this.newCategoria).subscribe(
        (data) => {
          this.obtenerCategorias();
          this.newCategoria = new Categoria();
          this.editMode = false;
          Swal.fire('Saved!', '', 'success');
        },
        (error) => {
          console.error('Error updating category', error);
        }
      );
    } else {
      this.categoriaService.crearCategoria(this.newCategoria).subscribe(
        (data) => {
          this.listaDeCategorias.push(data);
          this.newCategoria = new Categoria();
          Swal.fire('Created!', '', 'success');
        },
        (error) => {
          console.error('Error creating category', error);
        }
      );
    }
  }

  editarCategoria(categoria: Categoria): void {
    this.newCategoria = { ...categoria };
    this.editMode = true;
  }
}
