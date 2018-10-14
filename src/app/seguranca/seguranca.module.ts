import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { AppSegurancaRoutingModule } from './seguranca-routing-module';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {PasswordModule} from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { Http, RequestOptions, HttpModule } from '@angular/http';
import { ManagerHttp } from './manager-http';
import { AuthGuard } from './auth.guard';

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    FormsModule,
    AppSegurancaRoutingModule,
    InputTextModule,
    PasswordModule,
    ButtonModule
  ],
  declarations: [LoginFormComponent],
  exports: [LoginFormComponent],
  providers: [ManagerHttp, AuthGuard]
})
export class SegurancaModule { }
