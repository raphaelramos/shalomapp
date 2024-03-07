import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventoPageRoutingModule } from './evento-routing.module';

import { EventoPage } from './evento.page';

import { DateModule  } from '../../shared/date.module';
import { LinkTransformerDirective } from '../../shared/linkTransformer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventoPageRoutingModule,
    DateModule
  ],
  declarations: [EventoPage, LinkTransformerDirective]
})
export class EventoPageModule {}
