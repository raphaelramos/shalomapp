import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstudosPage } from './estudos.page';

const routes: Routes = [
  {
    path: '',
    component: EstudosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstudosPageRoutingModule {}
