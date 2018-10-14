import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { ForbidenComponent } from './forbiden/forbiden.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NotFoundComponent,
    ForbidenComponent
  ],
  exports: [
    NotFoundComponent
  ]
})
export class ErrosModule { }
