import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DizimosPageRoutingModule } from './dizimos-routing.module';

import { DizimosPage } from './dizimos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DizimosPageRoutingModule
  ],
  declarations: [DizimosPage]
})
export class DizimosPageModule {}
