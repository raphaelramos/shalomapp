import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiProvider } from '../services/api';
import { WordpressService } from '../services/wordpress.service';
import { NavExtrasService } from '../services/nav.service';
import { DataService } from '../services/data.service';

import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { Insomnia } from '@awesome-cordova-plugins/insomnia/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  newVersion = false;
  info: any;
  stories: any = [];
  live = false;
  isInternet = true;
  today: any;

  constructor(public app: ApiProvider,
    public navExtras: NavExtrasService,
    private router: Router,
    private wp: WordpressService,
    private dataService: DataService,
    private screenOrientation: ScreenOrientation,
    private insomnia: Insomnia) {}
  
  ionViewDidEnter() {
    // no fix screen
    this.screenOrientation.unlock();

    // block screen
    this.insomnia.allowSleepAgain().then();

    // check live
    this.checkLive();

    // check internet
    this.isInternet = this.app.isOnline();
  }

  ngOnInit() {
    this.wp.getHome()
      .subscribe(data => {
        this.info = data.info;
        this.stories = data.stories;

        // check new version
        if (this.app.isNewerVersion(data.info.version)) {
          this.newVersion = true;
        }
    });
  }

  checkLive() {
    this.live = false;
    let date = new Date();
    let d = date.getDay();
    let h = date.getHours()+''+('0'+date.getMinutes()).slice(-2);

    let dates = this.dataService.dataConfig.live;
   
    dates.forEach(data => {
      let start = +data.hours;
      let end = +data.hours+200;
      if (d == data.day) {
        if (+h >= start && +h <= end) {
          this.live = true;
          return true;
        }
      }
    });
  }

  update() {
    this.app.update();
  }

  route(route) {
    this.router.navigate([route]);
  }

  goLive() {
    this.app.openUrlApp('https://www.youtube.com/user/shalomtvoficial/live');
  }

  goBilbia() {
    this.app.openUrlApp('https://my.bible.com/pt/bible/129/GEN.1.NVI');
  }

  goShaweb() {
    this.app.openUrlApp('https://shaweb.scc.org.br/');
  }

  goCatalogo() {
    this.app.openUrlApp('https://catalogo.scc.org.br/');
  }

  go(url) {
    this.app.openUrlApp(url);
  }

  openEvent(id) {
    this.router.navigate([`/eventos/${id}`]);
  }

  openPost(id) {
    this.router.navigate(['/post/', id]);
  }

  openStory(i) {
    this.navExtras.setStory(this.stories);
    this.router.navigate(['/slide/', i]);
  }

}
