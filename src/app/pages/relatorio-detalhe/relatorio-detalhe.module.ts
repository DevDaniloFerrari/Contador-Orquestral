import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { QrcodeModalPageModule } from './../qrcode-modal/qrcode-modal.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RelatorioDetalhePageRoutingModule } from './relatorio-detalhe-routing.module';

import { RelatorioDetalhePage } from './relatorio-detalhe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RelatorioDetalhePageRoutingModule,
    QrcodeModalPageModule
  ],
  declarations: [RelatorioDetalhePage],
  providers: [BarcodeScanner]
})
export class RelatorioDetalhePageModule {}
