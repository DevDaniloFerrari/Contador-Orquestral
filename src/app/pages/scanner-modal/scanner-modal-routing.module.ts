import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScannerModalPage } from './scanner-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ScannerModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScannerModalPageRoutingModule {}
