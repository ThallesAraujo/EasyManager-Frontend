import { Injectable } from '@angular/core';
import { Pessoa } from '../models/models';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpParamsOptions } from '@angular/common/http/src/params';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export class PessoaFiltro {
  nome: String;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})

export class PessoaService {

  pessoasUrl : string;

  constructor(private client: HttpClient) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
   }

  pesquisar(filtro: PessoaFiltro): Observable<any> {

    const pessoaFiltro = {};
    if (filtro.nome) {
      pessoaFiltro['nome'] = filtro.nome.toString();
    }
    pessoaFiltro['page'] = filtro.pagina.toString();
    pessoaFiltro['size'] =  filtro.itensPorPagina.toString();

    const httpParamsOptions: HttpParamsOptions = { fromObject: pessoaFiltro } as HttpParamsOptions;

    const httpOptions = {
      params: new HttpParams(httpParamsOptions)
    };

    return this.client.get(`${this.pessoasUrl}?resumo`, httpOptions);

  }

  listarTodas(): Observable<any> {

    return this.client.get<any>(this.pessoasUrl);

  }

  excluir(codigo: number): Observable<any> {

    return this.client.delete(`${this.pessoasUrl}/${codigo}`);

  }

  mudarStatus(codigo: number, ativo: boolean): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };

    return this.client.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo, options );
  }

  adicionar(pessoa: Pessoa): Observable<Pessoa> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };

    return this.client.post<Pessoa>(this.pessoasUrl, pessoa, options);

  }

  atualizar(pessoa: Pessoa): Observable<Pessoa> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };

    return this.client.put<Pessoa>(`${this.pessoasUrl}/${pessoa.id}/`, pessoa, options);

  }

  getPessoa(id: number): Observable<Pessoa> {

    return this.client.get<Pessoa>(`${this.pessoasUrl}/${id}`);

  }

}
