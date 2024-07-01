import { Categoria } from './Categoria';

export class Articulo {
  idArticulo: number;
  nombreArticulo: string;
  descripcionArticulo: string;
  categoria: Categoria;

  constructor() {
    this.idArticulo = 0;
    this.nombreArticulo = '';
    this.descripcionArticulo = '';
    this.categoria = new Categoria();
  }
}
