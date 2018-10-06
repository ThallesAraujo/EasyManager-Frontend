import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './erros/not-found/not-found.component';

const rotas: Routes = [
  { path: '', redirectTo: 'lancamentos', pathMatch: 'full' },
  { path: '404', component: NotFoundComponent },
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
