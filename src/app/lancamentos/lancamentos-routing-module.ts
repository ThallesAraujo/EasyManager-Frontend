import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LancamentosCadastroComponent } from './lancamentos-cadastro/lancamentos-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { AuthGuard } from '../seguranca/auth.guard';


const rotas: Routes = [
  {
    path: 'lancamentos',
    component: LancamentosPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_LANCAMENTO']},
  },
  {
    path: 'lancamentos/adicionar',
    component: LancamentosCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_LANCAMENTO']},
  },
  { path: 'lancamentos/:codigo',
  component: LancamentosCadastroComponent,
  canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_LANCAMENTO']},
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
 export class AppLancamentosRoutingModule {}
