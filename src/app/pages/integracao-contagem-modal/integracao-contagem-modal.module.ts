import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IntegracaoContagemModalPageRoutingModule } from './integracao-contagem-modal-routing.module';

import { IntegracaoContagemModalPage } from './integracao-contagem-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntegracaoContagemModalPageRoutingModule
  ],
  declarations: [IntegracaoContagemModalPage]
})
export class IntegracaoContagemModalPageModule {}
