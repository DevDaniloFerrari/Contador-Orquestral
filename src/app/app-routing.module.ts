import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'tela-inicial', pathMatch: 'full' },
  {
    path: 'listagem',
    loadChildren: () => import('./pages/listagem/listagem.module').then( m => m.ListagemPageModule)
  },
  {
    path: 'relatorio',
    loadChildren: () => import('./pages/relatorio/relatorio.module').then( m => m.RelatorioPageModule)
  },
  {
    path: 'tela-inicial',
    loadChildren: () => import('./pages/tela-inicial/tela-inicial.module').then( m => m.TelaInicialPageModule)
  },
  {
    path: 'historico',
    loadChildren: () => import('./pages/historico/historico.module').then( m => m.HistoricoPageModule)
  },
  {
    path: 'relatorio-detalhe',
    loadChildren: () => import('./pages/relatorio-detalhe/relatorio-detalhe.module').then( m => m.RelatorioDetalhePageModule)
  },  {
    path: 'qrcode-modal',
    loadChildren: () => import('./pages/qrcode-modal/qrcode-modal.module').then( m => m.QrcodeModalPageModule)
  },
  {
    path: 'integracao-contagem-modal',
    loadChildren: () => import('./pages/integracao-contagem-modal/integracao-contagem-modal.module').then( m => m.IntegracaoContagemModalPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
