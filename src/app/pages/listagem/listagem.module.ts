import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListagemPageRoutingModule } from './listagem-routing.module';

import { ComponentsModule } from 'src/app/components/components.module';
import { InstrumentoComponent } from 'src/app/components/instrumento/instrumento.component';

import { ListagemPage } from './listagem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListagemPageRoutingModule,
    ComponentsModule
  ],
  declarations: [
    ListagemPage,
    InstrumentoComponent
  ]
})
export class ListagemPageModule {}
