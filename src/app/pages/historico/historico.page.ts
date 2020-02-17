import { Component, OnInit } from '@angular/core';
import { Contagem } from 'src/app/shared/contagem';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage implements OnInit {

  public contagens = Array<Contagem>();
  public integracaoDeDados: boolean = false;

  constructor(
      private storage: Storage,
      public navCtrl: NavController) { }

  ngOnInit() {
    this.obterHistorico();
  }

  private obterHistorico(){
    this.obterChaves();
  }

  private obterChaves(){
    this.storage.keys().then(chaves => {
      chaves.forEach(chave => {
        this.obterContagem(chave);
      });
    });
  }

  private obterContagem(chave: string) {
    this.storage.get(chave).then(
      (contagem) => {
        if (contagem != null) {
          if (contagem.finalizada) {
            this.contagens.push(contagem);
          }
        }
      }
    );
  }

  public extrairRelatorio(contagem: Contagem){

    const navigationExtras: NavigationExtras = {
      queryParams: {
          contagem: JSON.stringify(contagem),
          voltarParaHistorico: true
      }
  };

    this.navCtrl.navigateForward('relatorio', navigationExtras);
  }

  public ativarIntegracaoDeDados(){
    this.integracaoDeDados = !this.integracaoDeDados;
  }

}
