import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'listagem', pathMatch: 'full' },
  {
    path: 'listagem',
    loadChildren: () => import('./pages/listagem/listagem.module').then( m => m.ListagemPageModule)
  },
  {
    path: 'relatorio',
    loadChildren: () => import('./pages/relatorio/relatorio.module').then( m => m.RelatorioPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppRoutingModule { }
