import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntegracaoContagemModalPage } from './integracao-contagem-modal.page';

const routes: Routes = [
  {
    path: '',
    component: IntegracaoContagemModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IntegracaoContagemModalPageRoutingModule {}
