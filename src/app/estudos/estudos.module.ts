import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstudosPageRoutingModule } from './estudos-routing.module';

import { EstudosPage } from './estudos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstudosPageRoutingModule
  ],
  declarations: [EstudosPage]
})
export class EstudosPageModule {}
