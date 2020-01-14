import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.page.html',
  styleUrls: ['./relatorio.page.scss'],
})
export class RelatorioPage implements OnInit {

  constructor(
    private storage: Storage
  ) { }

  private instrumentos: Map<string, number>;

  ngOnInit() {
    this.instrumentos = new Map<string, number>();
    this.obterQuantidades();
  }

  private obterQuantidades() {
    this.storage.forEach((value, key) => {
      this.instrumentos.set(key, value);
    });
  }

  public obterQuantidade(nomeDoInstrumento: string) {
    return this.instrumentos.get(nomeDoInstrumento);
  }

}
