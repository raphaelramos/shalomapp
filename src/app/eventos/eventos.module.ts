import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { eventosPageRoutingModule } from './eventos-routing.module';

import { eventosPage } from './eventos.page';

import { DateModule  } from '../shared/date.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    eventosPageRoutingModule,
    DateModule
  ],
  declarations: [eventosPage]
})
export class eventosPageModule {}
