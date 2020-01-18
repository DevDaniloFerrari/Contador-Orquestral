import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
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
  ],
  schemas: [
    NO_ERRORS_SCHEMA
 ]
})
export class PagesModule { }
