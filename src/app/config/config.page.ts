import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { ApiProvider } from '../services/api';
import { DatabaseService } from "../services/database.service";

@Component({
  selector: "app-config",
  templateUrl: "./config.page.html",
  styleUrls: ["./config.page.scss"],
})
export class ConfigPage implements OnInit {
  count: number = 0;

  constructor(
    public alertController: AlertController,
    public app: ApiProvider,
    private database: DatabaseService
  ) {}

  ngOnInit() {
    // Track a screen view
    this.app.firebase("Opções");
  }

  update() {
    this.app.updateSetting();
  }

  async clearNews() {
    this.database.clearNews();

    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Apagado",
      subHeader: "",
      message: "Os estudos salvos neste aparelho foram removidos.",
      buttons: ["OK"],
    });

    await alert.present();
  }

  r2() {
    this.count++;
    if (this.count > 6) {
      this.devAlert();
    }
  }

  async devAlert() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Amamos a criatividade!",
      subHeader: "",
      message:
        "Este aplicativo foi desenvolvido por Raphael Ramos e a equipe da R2 Company",
      buttons: ["OK"],
    });

    await alert.present();
  }
}
