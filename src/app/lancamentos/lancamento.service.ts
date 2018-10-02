import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import * as moment from 'moment';

export class LancamentoFiltro {
  descricao: string;
  dataLancamentoInicio: Date;
  dataLancamentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: Http) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {

    const params = new URLSearchParams();

    const headers = new Headers();

    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }

    if (filtro.dataLancamentoInicio) {
      params.set('dataVencimentoDe', moment(filtro.dataLancamentoInicio).format('YYYY-MM-DD'));
      console.log(moment(filtro.dataLancamentoInicio).format('YYYY-MM-DD'));
    }

    if (filtro.dataLancamentoFim) {
      params.set('dataVencimentoAte', moment(filtro.dataLancamentoFim).format('YYYY-MM-DD'));
    }

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(`${this.lancamentosUrl}?resumo`, { headers, search: params })
    .toPromise()
    .then(response => {
      const responseJson = response.json();
      const resultSet = responseJson.content;

      const resposta = {
        lancamentos: resultSet,
        total: responseJson.totalElements
      };

      return resposta;

    });
  }

  excluir(codigo: number): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    return this.http.delete(`${this.lancamentosUrl}/${codigo}`, { headers })
    .toPromise()
    .then(() => null);

  }

}
