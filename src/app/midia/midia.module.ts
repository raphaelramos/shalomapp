import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MidiaPageRoutingModule } from './midia-routing.module';

import { MidiaPage } from './midia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MidiaPageRoutingModule
  ],
  declarations: [MidiaPage]
})
export class MidiaPageModule {}
