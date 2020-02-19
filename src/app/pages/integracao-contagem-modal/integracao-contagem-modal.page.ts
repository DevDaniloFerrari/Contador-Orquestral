import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Contagem } from 'src/app/shared/contagem';
import { Storage } from '@ionic/storage';

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
    public storage: Storage
  ) { }

  ngOnInit() {
  }

  public async fecharModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  private somarContagens() {
    var contagem = new Contagem(this.descricao, this.data, true);
    contagem.finalizada = false;

    this.contagensParaIntegracao.forEach(
      f => {
        for (var i = 0; i < f.instrumentos.length; i++) {
          contagem.instrumentos[i].quantidade += f.instrumentos[i].quantidade;
        }
      }
    );


    this.salvarNoStorage(contagem);
  }

  public salvar() {
    this.somarContagens();
  }

  private salvarNoStorage(contagem: Contagem) {
    this.storage.keys().then(contagens => {
      var chave = contagens[contagens.length - 1];
      let proximaChave = ((+chave) + 1).toString();
      contagem.finalizada = true;
      this.storage.set(proximaChave, contagem).then(
        (response) => {
          this.fecharModal();
        }
      );
    });
  }
}
