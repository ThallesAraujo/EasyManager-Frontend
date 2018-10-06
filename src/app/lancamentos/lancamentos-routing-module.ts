import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LancamentosCadastroComponent } from './lancamentos-cadastro/lancamentos-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';


const rotas: Routes = [
  { path: 'lancamentos', component: LancamentosPesquisaComponent },
  { path: 'lancamentos/adicionar', component: LancamentosCadastroComponent },
  { path: 'lancamentos/:codigo', component: LancamentosCadastroComponent },
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
