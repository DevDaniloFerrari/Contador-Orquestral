import { ScannerModalPage } from './../scanner-modal/scanner-modal.page';
import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, ModalController } from '@ionic/angular';
import { Contagem } from 'src/app/shared/contagem';
import { Storage } from '@ionic/storage';
import { isUndefined } from 'util';

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

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    public toastController: ToastController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.contagemEmAndamento();
  }

  ionViewWillEnter() {
    this.contagemEmAndamento();
  }

  public iniciarContagem() {
    if (this.camposValidos()) {
      if (this.contagem.finalizada) {
        this.criarNovaContagem();
      } else {
        this.navCtrl.navigateForward('listagem');
      }
    } else {
      this.mostrarAvisoDeCamposVazios();
    }
  }

  private camposValidos() {
    return (!isUndefined(this.descricao) && this.descricao !== '') && !isUndefined(this.data);
  }

  private criarNovaContagem() {
    this.contagem = new Contagem(this.descricao, this.data, false);

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
          this.verificarFinalizacao();
        } else {
          this.configurarContagemDoPrimeiroLogin();
        }
      }
    );
  }

  private verificarFinalizacao() {
    if (this.contagem.finalizada) {
      this.resetarEntradas();
    } else {
      this.preencherEntradas();
    }
  }

  private resetarEntradas() {
    this.descricao = undefined;
    this.data = undefined;
  }

  private preencherEntradas() {
    this.descricao = this.contagem.descricao;
    this.data = this.contagem.data;
  }

  public async escanearQrCode() {
    const modal = await this.modalController.create({
      component: ScannerModalPage
    });
    return await modal.present();
  }

  private async mostrarAvisoDeCamposVazios() {
    const toast = await this.toastController.create({
      message: 'Preencha os campos descrição e data corretamente!',
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }

  private configurarContagemDoPrimeiroLogin() {
    this.contagem = new Contagem(undefined, undefined, false);
    this.contagem.finalizada = true;
  }

  public historico() {
    this.navCtrl.navigateForward('historico');
  }
}
