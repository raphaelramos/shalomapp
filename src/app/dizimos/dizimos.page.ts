import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { format, parseISO } from 'date-fns';

import { ApiProvider } from '../services/api';
import { WordpressService } from '../services/wordpress.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dizimos',
  templateUrl: './dizimos.page.html',
  styleUrls: ['./dizimos.page.scss'],
})
export class DizimosPage implements OnInit {
  pix: string;
  data: any = {
    metodo: 'Pix',
  };
  errorMessage = false;
  sendMessage = false;
  saving = false;
  dizimos_form = true;
  primicias = false;
  bancos = false;
  today = new Date();
  dataConfig: any;

  constructor(
    private platform: Platform,
    private app: ApiProvider,
    private wp: WordpressService,
    private dataService: DataService,
  ) {
    this.dataConfig = this.dataService.dataConfig.dizimos;
    this.pix = this.dataConfig.pix;
  }

  ngOnInit() {
    /* Devido problemas na aprovação do app durante revisão da apple, atualizo a versão no plugin AppInfo wordpress
    apenas após ser publicado. Antes disso o form fica oculto. */
    if (this.platform.is('ios')) {
      this.wp.getInfo().subscribe((data) => {
        const versionEnable = data.version_dizimos;
        const last = parseInt(versionEnable.charAt(versionEnable.length - 1));
        const replaced = versionEnable.slice(0, -1) + (last + 1);

        let check = this.app.isNewerVersion(replaced);
        if (!check) {
          this.dizimos_form = false;
        }
      });
    }

    // Track a screen view
    this.app.firebase('Dízimos e Ofertas');

    // check mouth to primicias enable field
    this.checkMouth();
  }

  ionViewDidEnter() {
    this.data.total = 0;
  }

  formatDate(value: string) {
    return format(parseISO(value), 'dd/MM/yyyy');
  }

  checkMouth() {
    let mouth = this.today.getMonth() + 1;
    if (mouth >= 11 || mouth == 1 || mouth == 2) {
      this.primicias = true;
    }
  }

  checkTotal() {
    this.data.total =
      (this.data.dizimo || 0) +
      (this.data.oferta || 0) +
      (this.data.oferta_primicias || 0) +
      (this.data.missoes || 0) +
      (this.data.social || 0) +
      (this.data.certo || 0) +
      (this.data.missao_esperanca || 0) +
      (this.data.construcao || 0) +
      (this.data.outros || 0);
  }

  open(url) {
    this.app.openUrlApp(url);
  }

  clipboardPix() {
    this.app.clipboard(this.pix);
  }

  PixCopiaCola() {
    this.app.clipboard(this.dataConfig.pixCopiaCola);
  }

  submit() {
    this.errorMessage = false;
    this.sendMessage = false;
    this.saving = true;

    this.app.dizimosForm(this.data).subscribe(
      () => {
        this.sendMessage = true;
        this.saving = false;
        this.data = {};
        this.app.firebaseEvent('enviar_form_dizimos');
      },
      (error) => {
        this.errorMessage = true;
        this.saving = false;
        console.log('Erro Formulário', error);
      },
    );
  }
}
