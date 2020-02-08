import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Contagem } from 'src/app/shared/contagem';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.page.html',
  styleUrls: ['./relatorio.page.scss'],
})
export class RelatorioPage implements OnInit {

  public contagem: Contagem;

  constructor(
    private storage: Storage
  ) { }

  ngOnInit() {
    this.contagemEmAndamento();
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

}
