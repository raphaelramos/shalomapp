import { Component, OnInit } from '@angular/core';

import { ApiProvider } from '../services/api';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';

import { DataService } from '../services/data.service';

@Component({
  selector: 'app-midia',
  templateUrl: './midia.page.html',
  styleUrls: ['./midia.page.scss'],
})
export class MidiaPage implements OnInit {

  dataConfig: any;

  constructor(public app: ApiProvider,
    private dataService: DataService,
    private screenOrientation: ScreenOrientation) {
      this.dataConfig = this.dataService.dataConfig.midia;
    }

  ngOnInit() {
    // no fix screen
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);

    // Track a screen view
    this.app.firebase("Mídia");
  }

  open(url: string, midia: string) {
    this.app.openUrlApp(url);
    this.app.firebaseEvent("ver_midia_" + midia);
  }

}
