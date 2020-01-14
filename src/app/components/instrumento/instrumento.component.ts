import { Component, OnInit, Input } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-instrumento',
  templateUrl: './instrumento.component.html',
  styleUrls: ['./instrumento.component.scss'],
})
export class InstrumentoComponent implements OnInit {

  @Input() public nomeDoInstrumento: string;
  @Input() public caminhoDaImagem: string;

  constructor(
    private storage: Storage
  ) { }

  quantidade: number;

  ngOnInit() {
    this.obterQuantidade(this.nomeDoInstrumento);
  }

  public somar() {
    this.quantidade++;
    this.salvar(this.nomeDoInstrumento, this.quantidade);
  }

  public subtrair() {
    if (this.quantidade > 0) {
      this.quantidade--;
      this.salvar(this.nomeDoInstrumento, this.quantidade);
    }
  }

  public salvar(nomeDoInstrumento: string, quantidade: number) {
    this.storage.set(nomeDoInstrumento, quantidade);
  }

  public obterQuantidade(nomeDoInstrumento: string) {
    this.storage.get(nomeDoInstrumento).then(
      (quantidadeResponse) => {

        if (isNaN(quantidadeResponse)) {
          this.salvar(nomeDoInstrumento, 0);
          this.quantidade = 0;
        }

        this.quantidade = quantidadeResponse;
      }
    );
  }

}
