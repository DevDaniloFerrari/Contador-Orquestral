import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListagemPage } from './listagem.page';

const routes: Routes = [
  {
    path: '',
    component: ListagemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class ListagemPageRoutingModule {}
