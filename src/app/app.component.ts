import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { WordpressService } from './services/wordpress.service';
import { ApiProvider } from './services/api';

import OneSignal from 'onesignal-cordova-plugin';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';

import { DatabaseService } from './services/database.service';
import { Capacitor } from '@capacitor/core';

import { App } from '@capacitor/app';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { FirebaseAnalytics } from '@capacitor-community/firebase-analytics';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public wp: WordpressService,
    public app: ApiProvider,
    public database: DatabaseService,
    private router: Router,
    private zone: NgZone,
    private screenOrientation: ScreenOrientation,
  ) {
    if (Capacitor.isNativePlatform()) {
      this.initializeApp();
      this.database.createDatabase();
    }
  }

  initializeApp() {
    const changeStatusBar = async () => {
      StatusBar.setStyle({ style: Style.Light });
      StatusBar.setOverlaysWebView({ overlay: true });
    };

    changeStatusBar;
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
    this.deepLink();
    this.firebase();
    this.initPush();
  }

  initPush() {
    OneSignal.initialize(this.app.onesignal_api);

    OneSignal.Notifications.addEventListener('click', async (e) => {
      let clickData = await e.notification;
      console.log('Notification Clicked : ' + clickData);
    });

    OneSignal.Notifications.requestPermission(true).then((success: Boolean) => {
      console.log('Notification permission granted ' + success);
    });
  }

  deepLink() {
    App.addListener('appUrlOpen', (data: any) => {
      this.zone.run(() => {
        // Example url: https://beerswift.org.br/tabs/tab2
        // slug = /tabs/tab2
        const slug = data.url.split('.org.br').pop();
        if (slug) {
          if (slug.includes('estudos/') || slug.includes('comunicacao/')) {
            const id = slug.substr('/estudos', '').substr('/comunicacao', '');
            this.wp.getSlugId(id).subscribe((res) => {
              this.router.navigate(['/post/', res]);
            });
            return;
          }

          if (slug.includes('evento/')) {
            const id = slug.substr('/evento', '');
            this.wp.getSlugIdEvent(id).subscribe((res) => {
              this.router.navigate(['/eventos/', res]);
            });
            return;
          }

          const pages = [
            '/eventos',
            '/estudos',
            '/locais',
            '/dizimosofertas',
            '/celulas',
            '/catalogo',
            '/historia',
            '/projetos-sociais',
          ];

          let component = slug;
          // remove last / path
          if (component.slice(-1) == '/') {
            component = component.slice(0, -1);
          }

          if (pages.includes(component)) {
            this.router.navigate([component]);
            return;
          }

          this.app.openUrlApp(data.url);
        }
        // If no match, do nothing - let regular routing
        // logic take over
      });
    });
  }

  firebase() {
    FirebaseAnalytics.initializeFirebase({
      apiKey: '',
      authDomain: 'https://extreme-course-94311.firebaseio.com',
      databaseURL: 'https://extreme-course-94311.firebaseio.com',
      projectId: 'extreme-course-9431',
      storageBucket: 'extreme-course-94311.appspot.com',
      messagingSenderId: '868244315400',
      appId: '868244315400',
      measurementId: 'G-W0T2CX038N',
    });
    FirebaseAnalytics.getAppInstanceId();
  }

  unlock() {
    this.screenOrientation.unlock();
  }
}
