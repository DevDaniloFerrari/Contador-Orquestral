import { IntegracaoContagemModalPage } from './../integracao-contagem-modal/integracao-contagem-modal.page';
import { Component, OnInit } from '@angular/core';
import { Contagem } from 'src/app/shared/contagem';
import { Storage } from '@ionic/storage';
import { NavController, ModalController, ToastController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage implements OnInit {

  public contagens = Array<Contagem>();
  public contagensParaIntegracao = Array<Contagem>();
  public integracaoDeDados: boolean = false;

  constructor(
    private storage: Storage,
    public navCtrl: NavController,
    private modalController: ModalController,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.obterHistorico();
  }

  private obterHistorico() {
    this.obterChaves();
  }

  private obterChaves() {
    this.storage.keys().then(chaves => {
      chaves.forEach(chave => {
        this.obterContagem(chave);
      });
    });
  }

  private obterContagem(chave: string) {
    this.storage.get(chave).then(
      (contagem) => {
        if (contagem != null) {
          if (contagem.finalizada) {
            this.contagens.push(contagem);
          }
        }
      }
    );
  }

  public extrairRelatorio(contagem: Contagem) {

    const navigationExtras: NavigationExtras = {
      queryParams: {
        contagem: JSON.stringify(contagem),
        voltarParaHistorico: true
      }
    };

    this.navCtrl.navigateForward('relatorio', navigationExtras);
  }

  public adicionarContagemParaIntegracao(contagem: Contagem) {
    if (!this.contagensParaIntegracao.find(f => f == contagem))
      this.contagensParaIntegracao.push(contagem);
    else
      this.contagensParaIntegracao.splice(this.contagensParaIntegracao.indexOf(contagem), 1);
  }

  public async abrirModalDeIntegracao(contagensParaIntegracao: Array<Contagem>) {
    const modal = await this.modalController.create({
      component: IntegracaoContagemModalPage, componentProps: {
        'contagensParaIntegracao': contagensParaIntegracao
      }
    });

    modal.onDidDismiss().then(
      (data) => {
        this.atualizarHistorico();
      }
    );

    return await modal.present();
  }

  public ativarIntegracaoDeDados() {
    if (this.integracaoDeDados)
      this.gerarContagemIntegrada();

    this.integracaoDeDados = true;
  }

  public desativarIntegracaoDeDados() {
    this.contagensParaIntegracao.splice(0, this.contagensParaIntegracao.length);
    this.integracaoDeDados = false;
  }

  private gerarContagemIntegrada() {
    if (this.contagensParaIntegracao.length >= 2)
      this.abrirModalDeIntegracao(this.contagensParaIntegracao);
    else
      this.mostrarAvisoDeNenhumaContagemSelecionada();
  }

  private async mostrarAvisoDeNenhumaContagemSelecionada() {
    const toast = await this.toastController.create({
      message: 'Secione ao menos 2 contagens!',
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }


  private atualizarHistorico() {
    this.desativarIntegracaoDeDados();
    this.contagens.splice(0, this.contagens.length)
    this.obterHistorico();
  }

}
