import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './erros/not-found/not-found.component';
import { ForbiddenComponent } from './erros/forbidden/forbidden.component';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { AppPessoasRoutingModule } from './pessoas/pessoas-routing-module';
import { AppLancamentosRoutingModule } from './lancamentos/lancamentos-routing-module';

const rotas: Routes = [
      { path: '', redirectTo: 'lancamentos', pathMatch: 'full' },
      { path: '403', component: ForbiddenComponent },
      { path: '404', component: NotFoundComponent }
    ];

@NgModule({
 imports : [
  RouterModule.forRoot(rotas),
 ],
 exports: [
  RouterModule
 ]
})
export class AppRoutingModule {}
