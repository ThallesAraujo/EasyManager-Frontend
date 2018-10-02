import { Component, OnInit, ViewChild } from '@angular/core';
import { PessoaFiltro, PessoaService } from '../pessoa.service';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from '../../error-handler.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalRegistros = 0;

  filtro = new PessoaFiltro();

  pessoas = [];

  @ViewChild('tabela') grid;

  constructor(private pessoaService: PessoaService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService) {}

  ngOnInit() {}


  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
    .then(resposta => {
      this.totalRegistros = resposta.total;
      this.pessoas = resposta.pessoas;
    });
  }

  mudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;

    this.pesquisar(pagina);

  }

  exclusaoConfirmada(pessoa: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza de que deseja excluir ',
      accept: () => {
        this.excluir(pessoa);
      },
    });
  }

  excluir(pessoa: any) {

    this.pessoaService.excluir(pessoa.id)
    .then( () => {
      this.grid.first = 0;
      this.pesquisar();
      this.messageService.add({severity: 'success', detail: 'Pessoa excluída!'});

    })
    .catch(erro => this.errorHandler.handle(erro));

  }

  mudarStatus(pessoa: any) {
    if (pessoa.ativo) {
      this.pessoaService.mudarStatus(pessoa.id, false)
      .then( () => {
        this.grid.first = 0;
        this.pesquisar();
        this.messageService.add({severity: 'success', detail: 'Pessoa desativada!'});
      })
      .catch(erro => this.errorHandler.handle(erro));

    } else {
      this.pessoaService.mudarStatus(pessoa.id, true)
      .then( () => {
        this.grid.first = 0;
        this.pesquisar();
        this.messageService.add({severity: 'success', detail: 'Pessoa ativada!'});
      })
      .catch(erro => this.errorHandler.handle(erro));
    }
  }



}
