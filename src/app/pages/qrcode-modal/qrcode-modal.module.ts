import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrcodeModalPageRoutingModule } from './qrcode-modal-routing.module';

import { QrcodeModalPage } from './qrcode-modal.page';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxQRCodeModule,
    QrcodeModalPageRoutingModule
  ],
  declarations: [QrcodeModalPage]
})
export class QrcodeModalPageModule {}
