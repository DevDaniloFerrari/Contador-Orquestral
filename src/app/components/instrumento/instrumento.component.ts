import { Component, OnInit, Input } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Contagem } from 'src/app/shared/contagem';

@Component({
  selector: 'app-instrumento',
  templateUrl: './instrumento.component.html',
  styleUrls: ['./instrumento.component.scss'],
})
export class InstrumentoComponent implements OnInit {

  @Input() public nomeDoInstrumento: string;
  @Input() public caminhoDaImagem: string;

  public contagem: Contagem;

  constructor(
    private storage: Storage
  ) { }

  quantidade: number;

  ngOnInit() {
    this.contagemEmAndamento();
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
        this.obterQuantidade(this.nomeDoInstrumento);
      }
    );
  }

  public somar() {
    this.quantidade++;
    this.contagem.instrumentos.find(f => f.nome === this.nomeDoInstrumento).quantidade = this.quantidade;
    this.salvar();
  }

  public subtrair() {
    if (this.quantidade > 0) {
      this.quantidade--;
      this.contagem.instrumentos.find(f => f.nome === this.nomeDoInstrumento).quantidade = this.quantidade;
      this.salvar();
    }
  }

  public salvar() {
    this.storage.keys().then(contagens => {
      const chave = contagens[contagens.length - 1];
      this.storage.get(chave).then(
        (contagem) => {
          contagem.instrumentos.find(f => f.nome === this.nomeDoInstrumento).quantidade = this.quantidade;
          this.storage.set(chave, contagem);
        }
      );
    });
  }

  public obterQuantidade(nomeDoInstrumento: string) {
    this.quantidade = this.contagem.instrumentos.find(f => f.nome === nomeDoInstrumento).quantidade;
  }

}
