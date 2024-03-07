import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platform, AlertController } from '@ionic/angular';
import { SHAWEB_BASE } from '../app.api';
import { BehaviorSubject } from 'rxjs';

import { NativeStorage } from "@awesome-cordova-plugins/native-storage/ngx";
import { App, AppInfo } from "@capacitor/app";
import { AppLauncher } from "@capacitor/app-launcher";
import { Network } from "@capacitor/network";
import { Share } from "@capacitor/share";
import { Browser } from "@capacitor/browser";
import { Clipboard } from "@capacitor/clipboard";
import { Toast } from "@capacitor/toast";
import { FirebaseAnalytics } from "@capacitor-community/firebase-analytics";
import { take } from "rxjs/operators";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiProvider {
  public android_package = 'com.r2company.shalom';
  public apple_id = 'id1534254375';
  public google_api = environment.google_api;
  public youtube_channel_id = environment.youtube_channel_id;
  public scc_base_url = environment.scc_base_url;
  public onesignal_api = environment.onesignal_api;
  public wordpress_api_url = this.scc_base_url + 'wp-json/wp/v2/';
  public appInfo: AppInfo;

  public fontSize: number = 20;
  public language: string;
  public category_id;
  public news = new BehaviorSubject([]);

  public networkStatus = true;

  constructor(
    public http: HttpClient,
    private platform: Platform,
    public alertController: AlertController,
    private storage: NativeStorage,
  ) {
    this.listenToInternet();
    this.infoApp();
    this.platform.ready().then(() => {
      storage
        .getItem('settings')
        .then((val) => {
          if (val !== null && val !== undefined) {
            this.fontSize = val.fontSize;
          }
        })
        .catch(() => {
          // no config save
          // init font size
          this.fontSize = 20;
        });
    });
  }

  listenToInternet() {
    Network.addListener('networkStatusChange', (status) => {
      this.networkStatus = status.connected;
    });
    console.log('api', this.networkStatus);
  }

  isOnline() {
    return this.networkStatus;
  }

  infoApp = async () => {
    const info = await App.getInfo();
    this.appInfo = info;
  };

  firebase(screen) {
    FirebaseAnalytics.setScreenName({
      screenName: screen,
      nameOverride: screen,
    });
  }

  firebaseEvent(event) {
    FirebaseAnalytics.logEvent({
      name: 'app_' + event,
      params: {},
    });
  }

  async openUrl(url) {
    await Browser.open({ url: url });
  }

  async openUrlApp(url) {
    await AppLauncher.openUrl({ url: url });
  }

  async shareText(text: string) {
    await Share.share({
      dialogTitle: 'Compartilhar',
      text: text,
    });
  }

  async shareUrl(url: string) {
    await Share.share({
      dialogTitle: 'Compartilhar',
      url: url,
    });
  }

  async clipboard(text) {
    await Clipboard.write({
      string: text,
    });
    this.toast('Copiado');
  }

  async toast(text) {
    await Toast.show({
      text: text,
    });
  }

  get(url): any {
    return this.http.get(url).pipe(take(1));
  }

  getCelulas(): any {
    return this.http.get('https://api.shaweb.scc.org.br/public/mapa-dados');
  }

  isNewerVersion(newVer) {
    const oldVer = String(this.appInfo.version);
    const oldParts = oldVer.split('.');
    const newParts = newVer.split('.');

    for (var i = 0; i < newParts.length; i++) {
      const a = ~~newParts[i]; // parse int
      const b = ~~oldParts[i]; // parse int
      if (a > b) return true;
      if (a < b) return false;
    }
    return false;
  }

  update() {
    if (this.platform.is('android')) {
      this.openUrlApp(`market://details?id=${this.android_package}`);
    } else if (this.platform.is('ios')) {
      this.openUrlApp(`itms-apps://itunes.apple.com/app/${this.apple_id}`);
    }
  }

  getBible() {
    let version = 'pt_nvi';
    return this.http.get<any>(`../assets/bible/${version}.json`);
  }

  updateSetting() {
    this.storage.setItem('settings', {
      fontSize: this.fontSize,
    });
  }

  dizimosForm(data) {
    var link = `${SHAWEB_BASE}/dizimos`;
    return this.http.post(link, data);
  }

  async error(data) {
    const alert = await this.alertController.create({
      header: 'Erro',
      message: data,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
