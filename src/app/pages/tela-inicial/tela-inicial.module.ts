import { ScannerModalPageModule } from './../scanner-modal/scanner-modal.module';
import { ScannerModalPage } from './../scanner-modal/scanner-modal.page';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TelaInicialPageRoutingModule } from './tela-inicial-routing.module';

import { TelaInicialPage } from './tela-inicial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TelaInicialPageRoutingModule,
    ScannerModalPageModule
  ],
  declarations: [TelaInicialPage],
  providers: [BarcodeScanner],
  entryComponents: [ScannerModalPage]
})
export class TelaInicialPageModule {}
