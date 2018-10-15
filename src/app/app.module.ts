import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, ConnectionBackend, RequestOptions } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LOCALE_ID} from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

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
import { JwtHelper } from 'angular2-jwt';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './seguranca/auth-interceptor';

registerLocaleData(localePt);

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
    JwtHelper,
    OauthService,
    Title,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    }
    /*TODO:precisa baixar os dados de locale*/
    /*{ provide: LOCALE_ID, useValue: 'pt-BR' }*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
