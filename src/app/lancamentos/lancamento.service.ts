import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Lancamento } from '../models/models';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpParamsOptions } from '@angular/common/http/src/params';
import { environment } from 'src/environments/environment';

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

  lancamentosUrl: string;

  constructor(private client: HttpClient) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
   }

  getLancamentos(filtro: LancamentoFiltro): Observable<any> {

    const lancFilter = {};

    if (filtro.descricao) {
      lancFilter['descricao'] = filtro.descricao;
    }

    if (filtro.dataLancamentoInicio) {
      lancFilter['dataVencimentoDe'] =  moment(filtro.dataLancamentoInicio).format('YYYY-MM-DD');
    }

    if (filtro.dataLancamentoFim) {
      lancFilter['dataVencimentoAte'] =  moment(filtro.dataLancamentoFim).format('YYYY-MM-DD');
    }

    lancFilter['page'] = filtro.pagina.toString();
    lancFilter['size'] =  filtro.itensPorPagina.toString();

    const httpParamsOptions: HttpParamsOptions = { fromObject: lancFilter } as HttpParamsOptions;

    const httpOptions = {
      params: new HttpParams(httpParamsOptions)
    };

    return this.client.get(`${this.lancamentosUrl}?resumo`, httpOptions);
  }

  excluir(codigo: number): Observable<Object> {
    return this.client.delete(`${this.lancamentosUrl}/${codigo}`);
  }

  adicionar(lancamento: Lancamento): Observable<Lancamento> {
   const options = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     }),
   };
   return this.client.post<Lancamento>(this.lancamentosUrl, lancamento, options);

  }

  atualizar(lancamento: Lancamento): Observable<Lancamento> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };

    return this.client.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.codigo}/`, lancamento, options);

  }

  getLancamento(codigo: number): Promise<Lancamento> {

    return this.client.get<Lancamento>(`${this.lancamentosUrl}/${codigo}`)
    .toPromise()
    .then( lancamento => {
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
