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
    RelatorioDetalhePageRoutingModule
  ],
  declarations: [RelatorioDetalhePage]
})
export class RelatorioDetalhePageModule {}
