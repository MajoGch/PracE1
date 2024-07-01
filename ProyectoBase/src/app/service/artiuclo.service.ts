import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Articulo } from '../model/Articulo';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  private apiUrl = 'http://localhost:8080/apiCategoriaArticulo/articulos';

  constructor(private http: HttpClient) {}

  getArticulos(): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(this.apiUrl);
  }

  getArticulo(id: number): Observable<Articulo> {
    return this.http.get<Articulo>(this.apiUrl+id);
  }

  crearArticulo(articulo: Articulo): Observable<Articulo> {
    return this.http.post<Articulo>(this.apiUrl, articulo);
  }

  actualizarArticulo(id: number, articulo: Articulo): Observable<Articulo> {
    return this.http.put<Articulo>(this.apiUrl+id, articulo);
  }

  eliminarArticulo(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl+id);
  }
}