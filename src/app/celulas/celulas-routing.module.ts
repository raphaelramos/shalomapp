import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CelulasPage } from './celulas.page';

const routes: Routes = [
  {
    path: '',
    component: CelulasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CelulasPageRoutingModule {}
