import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../categorias/categoria.service';
import { ErrorHandlerService } from '../../error-handler.service';
import { PessoaService } from '../../pessoas/pessoa.service';
import { Lancamento } from '../../models/models';
import { FormControl } from '@angular/forms';
import { LancamentoService } from '../lancamento.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lancamentos-cadastro',
  templateUrl: './lancamentos-cadastro.component.html',
  styleUrls: ['./lancamentos-cadastro.component.css']
})
export class LancamentosCadastroComponent implements OnInit {

  lancamento = new Lancamento();

  tiposLancamento = [
    { label: 'Despesa', value: 'DESPESA' },
    { label: 'Receita', value: 'RECEITA' }
  ];

  categorias = [];

  pessoas = [];


  constructor(
    private categoriaService: CategoriaService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private pessoaService: PessoaService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getCategorias();
    this.getPessoas();
    const codigoLancamento = this.activatedRoute.snapshot.params['codigo'];

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

  }

  get editando() {
    return Boolean(this.lancamento.codigo);
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.getLancamento(codigo)
    .then(lancamento => {
      this.lancamento = lancamento;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    this.lancamentoService.adicionar(this.lancamento)
    .then( () => {
      this.messageService.add({severity: 'success', detail: 'Lançamento adicionado com sucesso!'});
      form.reset();
      this.lancamento = new Lancamento();
    })
    .catch(erro => this.errorHandler.handle(erro));
    console.log(this.lancamento);
  }

  getCategorias() {
    return this.categoriaService.listarTodas()
    .then( categorias => {
      this.categorias = categorias.map(cat => {
        return { label: cat.nome, value: cat.codigo };
      });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  getPessoas() {
    return this.pessoaService.listarTodas()
    .then( pessoas => {
      this.pessoas = pessoas.map( ps => {
        return { label: ps.nome, value: ps.id }
      });
    })
    .catch( erro => this.errorHandler.handle(erro));
  }


}
