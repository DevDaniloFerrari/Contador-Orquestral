import { Contagem } from './../../shared/contagem';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoadingController, Platform, AlertController, ModalController } from '@ionic/angular';
import jsQR from 'jsqr';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-scanner-modal',
  templateUrl: './scanner-modal.page.html',
  styleUrls: ['./scanner-modal.page.scss'],
})
export class ScannerModalPage implements OnInit {

  @ViewChild('video', { static: false }) video: ElementRef;
  @ViewChild('canvas', { static: false }) canvas: ElementRef;

  canvasElement: any;
  videoElement: any;
  canvasContext: any;
  scanActive = false;
  scanResult = null;
  loading: HTMLIonLoadingElement = null;

  constructor(
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private plt: Platform,
    private storage: Storage,
    private modalController: ModalController
  ) {
    const isInStandaloneMode = () =>
      'standalone' in window.navigator && window.navigator['standalone'];
    if (this.plt.is('ios') && isInStandaloneMode()) {
      console.log('I am a an iOS PWA!');
      // E.g. hide the scan functionality!
    }
  }

  ngOnInit() {
    this.startScan();
  }

  ngAfterViewInit() {
    this.canvasElement = this.canvas.nativeElement;
    this.canvasContext = this.canvasElement.getContext('2d');
    this.videoElement = this.video.nativeElement;
  }


  async startScan() {
    // Not working on iOS standalone mode!
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    });

    this.videoElement.srcObject = stream;
    // Required for Safari
    this.videoElement.setAttribute('playsinline', true);

    this.loading = await this.loadingCtrl.create({});
    await this.loading.present();

    this.videoElement.play();
    requestAnimationFrame(this.scan.bind(this));
  }

  async scan() {
    if (this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA) {
      if (this.loading) {
        await this.loading.dismiss();
        this.loading = null;
        this.scanActive = true;
      }

      this.canvasElement.height = this.videoElement.videoHeight;
      this.canvasElement.width = this.videoElement.videoWidth;

      this.canvasContext.drawImage(
        this.videoElement,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert'
      });

      if (code) {
        this.scanActive = false;
        this.scanResult = code.data;
        this.converterJSON(this.scanResult);
      } else {
        if (this.scanActive) {
          requestAnimationFrame(this.scan.bind(this));
        }
      }
    } else {
      requestAnimationFrame(this.scan.bind(this));
    }
  }

  reset() {
    this.scanResult = null;
  }

  stopScan() {
    this.scanActive = false;
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  private converterJSON(json: string) {
    try {
      var contagemEscaneada = JSON.parse(json);
      contagemEscaneada.contagemEscaneada = true;
      if (contagemEscaneada.chaveDeValidacao == "FC7FE49234C147DC22A66DDB6DE46") {
        this.salvarNoHistorico(contagemEscaneada);
      } else {
        this.mostrarMensagemDeErro();
        this.stopScan();
      }
    } catch (error) {
      this.mostrarMensagemDeErro();
      this.stopScan();
    }
  }

  public salvarNoHistorico(contagem: Contagem) {
    this.storage.keys().then(contagens => {
      var chave = contagens[contagens.length - 1];
      const proximaChave = ((+chave) + 1).toString();
      this.storage.set(proximaChave, contagem).then(
        (response) => {
          this.mostrarMensagemDeConfirmacao();
          this.stopScan();
        },
        (error) => {
          this.mostrarMensagemDeErro();
          this.stopScan();
        },
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

}