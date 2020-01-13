import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.page.html',
  styleUrls: ['./listagem.page.scss'],
})
export class ListagemPage implements OnInit {

  constructor(
    public alertController: AlertController,
    public navCtrl: NavController
    ) { }

  ngOnInit() {
  }

  async alertaDeConfirmacao() {
    const alert = await this.alertController.create({
      header: 'Confirmação!',
      message: 'Deseja finalizar essa contagem?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Confirmar',
          handler: () => {
            this.navCtrl.navigateForward('relatorio');
          }
        }
      ]
    });

    await alert.present();
  }

}
