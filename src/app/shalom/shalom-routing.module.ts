import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShalomPage } from './shalom.page';

const routes: Routes = [
  {
    path: '',
    component: ShalomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShalomPageRoutingModule {}
