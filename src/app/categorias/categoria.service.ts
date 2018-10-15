import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriasUrl = 'http://localhost:8080/categorias';

  constructor(private client: HttpClient) { }

  listarTodas(): Observable<Categoria[]> {

    return this.client.get<Categoria[]>(this.categoriasUrl);

  }

}
