import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { eventosPage } from './eventos.page';

const routes: Routes = [
  {
    path: '',
    component: eventosPage
  },
  {
    path: ':id',
    loadChildren: () => import('./evento/evento.module').then( m => m.EventoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class eventosPageRoutingModule {}
