import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstatisticaPage } from './estatistica.page';

const routes: Routes = [
  {
    path: '',
    component: EstatisticaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstatisticaPageRoutingModule {}
