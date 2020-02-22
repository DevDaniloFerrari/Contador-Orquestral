import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Contagem } from 'src/app/shared/contagem';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.page.html',
  styleUrls: ['./listagem.page.scss'],
})
export class ListagemPage implements OnInit {

  public contagem: Contagem;
  public chave: string;
  public naipe = 'cordas';

  constructor(
    public alertController: AlertController,
    public navCtrl: NavController,
    public storage: Storage
    ) { }

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
      }
    );
  }

  public salvar() {
    this.storage.keys().then(contagens => {
      this.chave = contagens[contagens.length - 1];
      this.storage.get(this.chave).then(
        (contagem) => {
          contagem.finalizada = true;
          this.storage.set(this.chave, contagem).then(
            (response) => {
              this.navCtrl.navigateForward('relatorio');
            }
          );
        }
      );
    });
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
            this.salvar();
          }
        }
      ]
    });

    await alert.present();
  }

}
