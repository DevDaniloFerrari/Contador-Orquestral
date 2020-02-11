import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Contagem } from 'src/app/shared/contagem';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.page.html',
  styleUrls: ['./tela-inicial.page.scss']
})
export class TelaInicialPage implements OnInit {
  public descricao: string;
  public data: string;
  public contagem: Contagem;
  public chave: string;

  constructor(public navCtrl: NavController, private storage: Storage) { }

  ngOnInit() {
    this.contagemEmAndamento();
  }

  public iniciarContagem() {
    if (this.contagem.finalizada) {
      this.criarNovaContagem();
    } else {
      this.navCtrl.navigateForward('listagem');
    }
  }

  private criarNovaContagem() {
    this.contagem = new Contagem(this.descricao, this.data);

    let proximaChave = ((+this.chave) + 1).toString();

    if (proximaChave === 'NaN') {
      proximaChave = '1';
    }

    this.storage.set(proximaChave, this.contagem).then(
      (response) => {
        this.navCtrl.navigateForward('listagem');
      }
    );
  }

  private contagemEmAndamento() {
    this.storage.keys().then(contagens => {
      this.chave = contagens[contagens.length - 1];

      this.obterContagem(this.chave);
    });
  }

  private obterContagem(chave: string) {
    this.storage.get(chave).then(
      (contagem) => {
        if (contagem != null) {
          this.contagem = contagem;
          
          if (!this.contagem.finalizada) {
            this.navCtrl.navigateForward('listagem');
            this.descricao = this.contagem.descricao;
            this.data = this.data;
          }
        }else{
          this.configurarContagemDoPrimeiroLogin();
        }
      }
    );
  }

  private configurarContagemDoPrimeiroLogin(){
    this.contagem = new Contagem(null, null);
    this.contagem.finalizada = true;
  }

  public historico(){
    this.navCtrl.navigateForward('historico');
  }
}
