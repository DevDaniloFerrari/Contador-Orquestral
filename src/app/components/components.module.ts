import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { InstrumentoComponent } from './instrumento/instrumento.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IonicModule,
    IonicStorageModule.forRoot()
  ]
})
export class ComponentsModule { }
