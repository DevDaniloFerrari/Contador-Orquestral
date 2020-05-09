import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScannerModalPageRoutingModule } from './scanner-modal-routing.module';

import { ScannerModalPage } from './scanner-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScannerModalPageRoutingModule
  ],
  declarations: [ScannerModalPage]
})
export class ScannerModalPageModule {}
