import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.page.html',
  styleUrls: ['./tela-inicial.page.scss'],
})
export class TelaInicialPage implements OnInit {

  public descricao: string;
  public data: string;

  constructor(
    public navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  public iniciarContagem() {
    this.navCtrl.navigateForward('listagem');
  }

}
