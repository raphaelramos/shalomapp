import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjetosSociaisPageRoutingModule } from './projetos-sociais-routing.module';

import { ProjetosSociaisPage } from './projetos-sociais.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjetosSociaisPageRoutingModule
  ],
  declarations: [ProjetosSociaisPage]
})
export class ProjetosSociaisPageModule {}
