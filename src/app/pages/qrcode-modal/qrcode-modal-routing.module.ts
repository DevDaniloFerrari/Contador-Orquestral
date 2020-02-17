import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrcodeModalPage } from './qrcode-modal.page';

const routes: Routes = [
  {
    path: '',
    component: QrcodeModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrcodeModalPageRoutingModule {}
