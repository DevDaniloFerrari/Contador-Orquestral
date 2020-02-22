import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Contagem } from 'src/app/shared/contagem';
import { Storage } from '@ionic/storage';
import { isUndefined } from 'util';

@Component({
  selector: 'app-integracao-contagem-modal',
  templateUrl: './integracao-contagem-modal.page.html',
  styleUrls: ['./integracao-contagem-modal.page.scss'],
})
export class IntegracaoContagemModalPage implements OnInit {

  @Input() contagensParaIntegracao: Array<Contagem>;

  public descricao: string;
  public data: string;

  constructor(
    private modalController: ModalController,
    public storage: Storage,
    public toastController: ToastController
  ) { }

  ngOnInit() {
  }

  public async fecharModal() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  private somarContagens() {
    const contagem = new Contagem(this.descricao, this.data, true);
    contagem.finalizada = false;

    this.contagensParaIntegracao.forEach(
      f => {
        for (let i = 0; i < f.instrumentos.length; i++) {
          contagem.instrumentos[i].quantidade += f.instrumentos[i].quantidade;
        }
      }
    );


    this.salvarNoStorage(contagem);
  }

  private camposValidos() {
    return (!isUndefined(this.descricao) && this.descricao !== '') && !isUndefined(this.data);
  }

  private async mostrarAvisoDeCamposVazios() {
    const toast = await this.toastController.create({
      message: 'Preencha os campos descrição e data corretamente!',
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }

  public salvar() {
    if(this.camposValidos()){
      this.somarContagens();
    } else {
      this.mostrarAvisoDeCamposVazios();
    }
  }

  private salvarNoStorage(contagem: Contagem) {
    this.storage.keys().then(contagens => {
      const chave = contagens[contagens.length - 1];
      const proximaChave = ((+chave) + 1).toString();
      contagem.finalizada = true;
      this.storage.set(proximaChave, contagem).then(
        (response) => {
          this.fecharModal();
        }
      );
    });
  }
}
