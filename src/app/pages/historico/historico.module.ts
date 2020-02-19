import { IntegracaoContagemModalPageModule } from './../integracao-contagem-modal/integracao-contagem-modal.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoricoPageRoutingModule } from './historico-routing.module';

import { HistoricoPage } from './historico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoricoPageRoutingModule,
    IntegracaoContagemModalPageModule
  ],
  declarations: [HistoricoPage]
})
export class HistoricoPageModule {}
