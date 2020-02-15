import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelatorioDetalhePage } from './relatorio-detalhe.page';

const routes: Routes = [
  {
    path: '',
    component: RelatorioDetalhePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RelatorioDetalhePageRoutingModule {}
