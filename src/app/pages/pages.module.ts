import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { InstrumentoComponent } from '../components/instrumento/instrumento.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [InstrumentoComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    IonicModule
  ]
})
export class PagesModule { }
