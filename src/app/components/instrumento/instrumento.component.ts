import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-instrumento',
  templateUrl: './instrumento.component.html',
  styleUrls: ['./instrumento.component.scss'],
})
export class InstrumentoComponent implements OnInit {

  @Input() public nomeDoInstrumento: string;
  @Input() public caminhoDaImagem: string;

  constructor() { }

  quantidade: number;

  ngOnInit() {
    this.quantidade = 0;
  }

  somar() {
    this.quantidade++;
  }

  subtrair() {
    if (this.quantidade > 0) {
      this.quantidade--;
    }
  }

}
