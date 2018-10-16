import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form.component';

const rotas: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
 imports : [
  RouterModule.forChild(rotas)
 ],
 exports: [
  RouterModule
 ]
})
export class AppSegurancaRoutingModule {}
