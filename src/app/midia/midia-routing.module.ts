import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MidiaPage } from './midia.page';

const routes: Routes = [
  {
    path: '',
    component: MidiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MidiaPageRoutingModule {}
