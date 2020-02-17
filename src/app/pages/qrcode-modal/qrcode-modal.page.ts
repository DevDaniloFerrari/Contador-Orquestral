import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-qrcode-modal',
  templateUrl: './qrcode-modal.page.html',
  styleUrls: ['./qrcode-modal.page.scss'],
})
export class QrcodeModalPage implements OnInit {

  @Input() qrcode: string;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.qrcode = this.navParams.get('qrcode');
  }

  fecharModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
