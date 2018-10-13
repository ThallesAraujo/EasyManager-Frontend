import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { ManagerHttp } from '../seguranca/manager-http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriasUrl = 'http://localhost:8080/categorias';

  constructor(private http: ManagerHttp) { }

  listarTodas(): Promise<any> {

    const headers = new Headers();

    const token = localStorage.getItem('token');

    headers.append('Authorization', `Bearer ${token}`);

    return this.http.get(this.categoriasUrl, { headers })
    .toPromise()
    .then(response => response.json());

  }

}
