import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocaisPageRoutingModule } from './locais-routing.module';

import { LocaisPage } from './locais.page';

import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocaisPageRoutingModule
  ],
  providers: [CallNumber],
  declarations: [LocaisPage]
})
export class LocaisPageModule {}
