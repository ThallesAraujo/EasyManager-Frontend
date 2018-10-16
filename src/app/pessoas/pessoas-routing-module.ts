import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoasCadastroComponent } from './pessoas-cadastro/pessoas-cadastro.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../seguranca/auth.guard';

const rotas: Routes = [
  {
    path: 'pessoas',
    component: PessoasPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_PESSOA']},
  },
  {
    path: 'pessoas/adicionar',
    component: PessoasCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_PESSOA']},
  },
  {
    path: 'pessoas/:id',
    component: PessoasCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_PESSOA']},
  }
];

@NgModule({
 imports : [
  RouterModule.forChild(rotas)
 ],
 exports: [
  RouterModule
 ]
})
export class AppPessoasRoutingModule {}
