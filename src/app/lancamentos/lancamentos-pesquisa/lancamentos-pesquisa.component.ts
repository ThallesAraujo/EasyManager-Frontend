import { Component, OnInit, ViewChild } from '@angular/core';

import { LancamentoService, LancamentoFiltro } from '../lancamento.service';

import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

import { MessageService, ConfirmationService } from 'primeng/api';
import { ErrorHandlerService } from '../../error-handler.service';
import { Title } from '@angular/platform-browser';
import { Lancamento } from 'src/app/models/models';
import { OauthService } from 'src/app/seguranca/oauth.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros = 0;

  filtro = new LancamentoFiltro();

  lancamentos = [];

  @ViewChild('tabela') grid;

  constructor(private lancamentoService: LancamentoService,
    private auth: OauthService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private confirmationService: ConfirmationService,
    private title: Title) {}

ngOnInit() {
  // Não necessário, o LazyLoad já chama o método de pesquisa
  // this.pesquisar();
  this.title.setTitle('Lançamentos');
}

  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;

    /*this.lancamentoService.pesquisar(this.filtro)
    .then(resposta => {
      this.totalRegistros = resposta.total;
      this.lancamentos = resposta.lancamentos;
    })
    .catch(erro => this.errorHandler.handle(erro));*/

    this.lancamentoService.getLancamentos(this.filtro)
    .subscribe( lancamentos => {
      this.lancamentos = lancamentos.content;
      this.totalRegistros = lancamentos.totalElements;
      console.log(lancamentos);
    }, error => this.errorHandler.handle(error));

  }

  getStyle(tipo: string) {
    if (tipo === 'DESPESA') {
      return {'color': 'red'};
    } else {
      return {'color': 'blue'};
    }
  }

  mudarPagina(event: LazyLoadEvent) {

    const pagina = event.first / event.rows;

    this.pesquisar(pagina);

  }

  exclusaoConfirmada(lancamento: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza de que deseja excluir ',
      accept: () => {
        this.excluir(lancamento);
      },
    });
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
    .then( () => {
      this.grid.first = 0;
      this.pesquisar();
      this.messageService.add({severity: 'success', detail: 'Lançamento excluído!'});
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}
