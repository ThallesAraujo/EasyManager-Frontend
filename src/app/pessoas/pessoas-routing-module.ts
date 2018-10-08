import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoasCadastroComponent } from './pessoas-cadastro/pessoas-cadastro.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const rotas: Routes = [
  { path: 'pessoas', component: PessoasPesquisaComponent },
  { path: 'pessoas/adicionar', component: PessoasCadastroComponent },
  { path: 'pessoas/:id', component: PessoasCadastroComponent },
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
