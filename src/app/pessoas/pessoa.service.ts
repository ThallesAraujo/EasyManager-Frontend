import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';

export class PessoaFiltro {
  nome: String;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})

export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(private http: Http) { }

  pesquisar(filtro: PessoaFiltro): Promise<any> {

    const params = new URLSearchParams();

    const headers = new Headers();

    if (filtro.nome) {
      params.set('nome', filtro.nome.toString());
    }

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(this.pessoasUrl, {headers, search: params})
    .toPromise()
    .then(response => {

      const responseJson = response.json();
      const resultSet = responseJson.content;

      const resposta = {
        pessoas: resultSet,
        total: responseJson.totalElements
      };

      return resposta;

    });

  }

  listarTodas(): Promise<any> {

    const headers = new Headers();

    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(this.pessoasUrl)
    .toPromise()
    .then(response => response.json().content);

  }

  excluir(codigo: number): Promise<any> {

    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.delete(`${this.pessoasUrl}/${codigo}`, {headers})
    .toPromise()
    .then( () => null);

  }

  mudarStatus(codigo: number, ativo: boolean): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo, {headers} )
    .toPromise()
    .then(() => null );

  }

}
