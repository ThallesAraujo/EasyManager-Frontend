import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NotFoundComponent,
    ForbiddenComponent
  ],
  exports: [
    NotFoundComponent
  ]
})
export class ErrosModule { }
