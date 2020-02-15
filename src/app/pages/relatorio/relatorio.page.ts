import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Contagem } from 'src/app/shared/contagem';
import { ActivatedRoute } from '@angular/router';
import { isUndefined } from 'util';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.page.html',
  styleUrls: ['./relatorio.page.scss'],
})
export class RelatorioPage implements OnInit {

  public contagem: Contagem;
  public mostrarBotaoDeVoltar: boolean;

  constructor(
    private storage: Storage,
    private route: ActivatedRoute,
    public navCtrl: NavController,
  ) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      if (!isUndefined(params.contagem)) {
        this.contagem = JSON.parse(params.contagem);
        this.mostrarBotaoDeVoltar = true;
      } else {
        this.contagemEmAndamento();
        this.mostrarBotaoDeVoltar = false;
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
    this.navCtrl.navigateForward('relatorio-detalhe');
  }
}
