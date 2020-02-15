import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Contagem } from 'src/app/shared/contagem';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { isUndefined } from 'util';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.page.html',
  styleUrls: ['./relatorio.page.scss'],
})
export class RelatorioPage implements OnInit {

  public contagem: Contagem;
  public voltarParaHistorico: boolean;

  constructor(
    private storage: Storage,
    private route: ActivatedRoute,
    public navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.obterParametros();
  }

  private obterParametros(){
    this.route.queryParams.subscribe(params => {
      if (!isUndefined(params.contagem)) {
        this.contagem = JSON.parse(params.contagem);
        this.voltarParaHistorico = params.voltarParaHistorico;
      } else {
        this.voltarParaHistorico = false;
        this.contagemEmAndamento();
      }
    });
  }

  public obterQuantidade(nomeDoInstrumento: string) {
    return this.contagem.instrumentos.find(f => f.nome === nomeDoInstrumento).quantidade;
  }

  private contagemEmAndamento() {
    this.storage.keys().then(contagens => {
      const chave = contagens[contagens.length - 1];
      this.obterContagem(chave);
    });
  }

  private obterContagem(chave: string) {
    this.storage.get(chave).then(
      (contagem) => {
        this.contagem = contagem;
      }
    );
  }

  public voltar() {
    this.navCtrl.back();
  }

  public abrirPaginaDeDetalhes() {

    const navigationExtras: NavigationExtras = {
      queryParams: {
          contagem: JSON.stringify(this.contagem),
      }
  };

    this.navCtrl.navigateForward('relatorio-detalhe', navigationExtras);
  }
}
