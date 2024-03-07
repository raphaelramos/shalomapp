import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DizimosPage } from './dizimos.page';

const routes: Routes = [
  {
    path: '',
    component: DizimosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DizimosPageRoutingModule {}
