import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjetosSociaisPage } from './projetos-sociais.page';

const routes: Routes = [
  {
    path: '',
    component: ProjetosSociaisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjetosSociaisPageRoutingModule {}
