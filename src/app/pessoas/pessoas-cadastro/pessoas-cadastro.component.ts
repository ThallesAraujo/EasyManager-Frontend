import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../pessoa.service';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from '../../error-handler.service';
import { Pessoa } from '../../models/models';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pessoas-cadastro',
  templateUrl: './pessoas-cadastro.component.html',
  styleUrls: ['./pessoas-cadastro.component.css']
})
export class PessoasCadastroComponent implements OnInit {


  pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const idPessoa = this.activatedRoute.snapshot.params['id'];
    if (idPessoa) {
      this.carregarPessoa(idPessoa);
      this.title.setTitle('Editar Pessoa');
    } else {
      this.title.setTitle('Adicionar Pessoa');
    }
  }

  get editando() {
    return Boolean(this.pessoa.id);
  }

  carregarPessoa(id: number) {
    this.pessoaService.getPessoa(id)
    .subscribe(pessoa => this.pessoa = pessoa,
    erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  adicionarPessoa(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
    .subscribe( () => {
      this.messageService.add({severity: 'success', detail: 'Pessoa adicionada com sucesso!'});
      this.router.navigate(['/pessoas']);
    },
    erro => this.errorHandler.handle(erro));
  }

  atualizarPessoa(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
    .subscribe( () => {
      this.messageService.add({severity: 'success', detail: 'Pessoa atualizada com sucesso!'});
    },
    erro => this.errorHandler.handle(erro));
  }

  nova(form: FormControl) {
    form.reset();
    setTimeout( function() {
      this.pessoa = new Pessoa();
    }.bind(this), 1 );
    this.router.navigate(['/pessoas/adicionar']);
  }



}
