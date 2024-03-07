import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'config',
    loadChildren: () => import('./config/config.module').then( m => m.ConfigPageModule)
  },
  {
    path: 'post',
    loadChildren: () => import('./post/post.module').then( m => m.PostPageModule)
  },
  {
    path: 'slide',
    loadChildren: () => import('./slide/slide.module').then( m => m.SlidePageModule)
  },
  {
    path: 'eventos',
    loadChildren: () => import('./eventos/eventos.module').then( m => m.eventosPageModule)
  },
  {
    path: 'estudos',
    loadChildren: () => import('./estudos/estudos.module').then( m => m.EstudosPageModule)
  },
  {
    path: 'locais',
    loadChildren: () => import('./locais/locais.module').then( m => m.LocaisPageModule)
  },
  {
    path: 'videos',
    loadChildren: () => import('./videos/videos.module').then( m => m.VideosPageModule)
  },
  {
    path: 'dizimosofertas',
    loadChildren: () => import('./dizimos/dizimos.module').then( m => m.DizimosPageModule)
  },
  {
    path: 'midia',
    loadChildren: () => import('./midia/midia.module').then( m => m.MidiaPageModule)
  },
  {
    path: 'celulas',
    loadChildren: () => import('./celulas/celulas.module').then( m => m.CelulasPageModule)
  },
  {
    path: 'shalom',
    loadChildren: () => import('./shalom/shalom.module').then( m => m.ShalomPageModule)
  },
  {
    path: 'historia',
    loadChildren: () => import('./historia/historia.module').then( m => m.HistoriaPageModule)
  },
  {
    path: 'projetos-sociais',
    loadChildren: () => import('./projetos-sociais/projetos-sociais.module').then( m => m.ProjetosSociaisPageModule)
  },
  {
    path: 'planos',
    loadChildren: () => import('./planos/planos.module').then( m => m.PlanosPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
