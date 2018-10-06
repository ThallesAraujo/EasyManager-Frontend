import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../categorias/categoria.service';
import { ErrorHandlerService } from '../../error-handler.service';
import { PessoaService } from '../../pessoas/pessoa.service';
import { Lancamento } from '../../models/models';
import { FormControl } from '@angular/forms';
import { LancamentoService } from '../lancamento.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

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
    private activatedRoute: ActivatedRoute,
    private title: Title,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCategorias();
    this.getPessoas();
    const codigoLancamento = this.activatedRoute.snapshot.params['codigo'];

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
      console.log('Instanciou', this.lancamento);
      this.title.setTitle('Editar Lançamento');
    } else {
      this.title.setTitle('Adicionar Lançamento');
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
    if (this.editando) {
      this.atualizarLancamento(form);
    } else {
      this.adicionarLancamento(form);
    }
  }

  adicionarLancamento(form: FormControl) {
    this.lancamentoService.adicionar(this.lancamento)
    .then( () => {
      this.messageService.add({severity: 'success', detail: 'Lançamento adicionado com sucesso!'});

      //form.reset();
      //this.lancamento = new Lancamento();

      this.router.navigate(['/lancamentos']);

    })
    .catch(erro => this.errorHandler.handle(erro));
    console.log(this.lancamento);
  }

  atualizarLancamento(form: FormControl) {
    this.lancamentoService.atualizar(this.lancamento)
    .then( lanc => {
      this.messageService.add({severity: 'success', detail: 'Lançamento editado com sucesso!'});
    })
    .catch(erro => this.errorHandler.handle(erro));
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

  novo(form: FormControl) {
    form.reset();
    setTimeout( function() {
      this.lancamento = new Lancamento();
    }.bind(this), 1 );
    this.router.navigate(['/lancamentos/adicionar']);
  }

}
