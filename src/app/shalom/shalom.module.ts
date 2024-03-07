import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShalomPageRoutingModule } from './shalom-routing.module';

import { ShalomPage } from './shalom.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShalomPageRoutingModule
  ],
  declarations: [ShalomPage]
})
export class ShalomPageModule {}
