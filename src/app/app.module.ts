import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

import { AppComponent } from './app.component';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentoService } from './lancamentos/lancamento.service';
import { PessoaService } from './pessoas/pessoa.service';
import { ErrorHandlerService } from './error-handler.service';
import { ErrosModule } from './erros/erros.module';
import { SegurancaModule } from './seguranca/seguranca.module';
import { AppRoutingModule } from './app-routing-module';
import { OauthService } from './seguranca/oauth.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    ErrosModule,
    AppRoutingModule,
    ToastModule,
    ConfirmDialogModule,
    LancamentosModule,
    PessoasModule,
    SegurancaModule
  ],
  providers: [
    LancamentoService,
    PessoaService,
    MessageService,
    ConfirmationService,
    ErrorHandlerService,
    OauthService,
    Title
    /*TODO:precisa baixar os dados de locale*/
    /*{ provide: LOCALE_ID, useValue: 'pt-BR' }*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
