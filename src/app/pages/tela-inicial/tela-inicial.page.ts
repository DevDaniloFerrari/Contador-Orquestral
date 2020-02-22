import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { Contagem } from 'src/app/shared/contagem';
import { Storage } from '@ionic/storage';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
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
  public contagemEscaneada: Contagem;

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    private barcodeScanner: BarcodeScanner,
    private alertController: AlertController,
    public toastController: ToastController
  ) { }

  ngOnInit() {
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

          if (!this.contagem.finalizada) {
            this.navCtrl.navigateForward('listagem');
            this.descricao = this.contagem.descricao;
            this.data = this.data;
          }
        } else {
          this.configurarContagemDoPrimeiroLogin();
        }
      }
    );
  }

  public escanearQrCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.contagemEscaneada = JSON.parse(barcodeData.text);
      this.contagemEscaneada.contagemIntegrada = true;
      this.salvarNoHistorico();
    }).catch(err => {
      console.log('Error', err);
    });
  }

  public salvarNoHistorico() {
    this.storage.keys().then(contagens => {
      this.chave = contagens[contagens.length - 1];
      const proximaChave = ((+this.chave) + 1).toString();
      this.storage.set(proximaChave, this.contagemEscaneada).then(
        (response) => {
          this.mostrarMensagemDeConfirmacao();
        },
        (error) => {
          this.mostrarMensagemDeErro();
        }
      );
    });
  }

  private async mostrarMensagemDeConfirmacao() {
    const alert = await this.alertController.create({
      header: 'Confirmação!',
      message: 'Escaneado com sucesso!',
      buttons: [
        {
          text: 'Continuar',
        }
      ]
    });

    await alert.present();
  }

  private async mostrarMensagemDeErro() {
    const alert = await this.alertController.create({
      header: 'Alerta!',
      message: 'Erro ao escanear QR Code!',
      buttons: [
        {
          text: 'Voltar',
        }
      ]
    });

    await alert.present();
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
    this.contagem = new Contagem(null, null, false);
    this.contagem.finalizada = true;
  }

  public historico() {
    this.navCtrl.navigateForward('historico');
  }
}
