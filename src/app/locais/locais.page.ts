import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { ApiProvider } from '../services/api';
import { ErrorService } from 'src/app/shared/error.service';
import { SHAWEB_BASE } from '../app.api';

import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';

@Component({
  selector: 'app-locais',
  templateUrl: './locais.page.html',
  styleUrls: ['./locais.page.scss'],
})
export class LocaisPage implements OnInit {

  locais: null;
  skeletons = [0, 0, 0, 0, 0]; //qtd loading

  constructor(public app: ApiProvider,
    public alertController: AlertController,
    private callNumber: CallNumber,
    private errorService: ErrorService) { }

  ngOnInit() {
    // get data
    this.fetchData();

    // Track a screen view
    this.app.firebase("Locais");
  }

  async fetchData() {
    this.app.get(`${SHAWEB_BASE}/locais`)
    .subscribe(data => {
      this.locais = data;
    }, (error: string) => {
      this.errorService.message(error);
    });
  }

  whatsapp() {
    window.open('whatsapp://send?phone=553432381207', '_system');
  }

  call() {
    this.callNumber.callNumber("03432381207", true);
  }

  async contact(type) {
    const alert = await this.alertController.create({
      cssClass: 'my-alert',
      header: 'Secretaria',
      message: 'Atendimento segunda a sexta das 08h30 às 17h30',
      buttons: [
        {
          text: 'Continuar',
          cssClass: 'secondary',
          handler: (blah) => {
            if (type == 'whatsapp') {
              this.whatsapp();
            } else {
              this.call();
            }
          }
        }]
    });

    await alert.present();
}

}
