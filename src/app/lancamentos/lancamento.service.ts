import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import * as moment from 'moment';
import { Lancamento } from '../models/models';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  constructor(private http: Http, private httpClient: HttpClient) { }

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
    return this.http.delete(`${this.lancamentosUrl}/${codigo}`, {headers})
    .toPromise()
    .then(() => null);
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    headers.append('Content-Type', 'application/json');


    return this.http.post(this.lancamentosUrl, lancamento, { headers })
    .toPromise()
    .then(response => response.json());
  }

  atualizar(lancamento: Lancamento, codigo: number) {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.lancamentosUrl}/${lancamento.codigo}/`, lancamento, {headers})
    .toPromise()
    .then( response => {
    return response.json();
    });

  }

  getLancamento(codigo: number): Promise<any> {

    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(`${this.lancamentosUrl}/${codigo}`, { headers })
    .toPromise()
    .then( response => {
      const lancamento = response.json() as Lancamento;

      this.lancamentosDatify([lancamento]);

      return lancamento;
    });

  }

  private lancamentosDatify(lancamentos: Lancamento[]) {

    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento, 'YYYY-MMM-DD').toDate();
      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento, 'YYYY-MM-DD').toDate();
      }
    }

  }

}
