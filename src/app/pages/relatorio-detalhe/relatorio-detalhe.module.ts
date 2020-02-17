import { QrcodeModalPageModule } from './../qrcode-modal/qrcode-modal.module';
import { QrcodeModalPage } from './../qrcode-modal/qrcode-modal.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RelatorioDetalhePageRoutingModule } from './relatorio-detalhe-routing.module';

import { RelatorioDetalhePage } from './relatorio-detalhe.page';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RelatorioDetalhePageRoutingModule,
    QrcodeModalPageModule
  ],
  declarations: [RelatorioDetalhePage]
})
export class RelatorioDetalhePageModule {}
