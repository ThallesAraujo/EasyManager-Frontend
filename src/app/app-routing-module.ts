import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './erros/not-found/not-found.component';
import { ForbidenComponent } from './erros/forbiden/forbiden.component';

const rotas: Routes = [
  { path: '', redirectTo: 'lancamentos', pathMatch: 'full' },
  { path: '404', component: NotFoundComponent },
  { path: '403', component: ForbidenComponent }
];

@NgModule({
 imports : [
  RouterModule.forRoot(rotas)
 ],
 exports: [
  RouterModule
 ]
})
export class AppRoutingModule {}
