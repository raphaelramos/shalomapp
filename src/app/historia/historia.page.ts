import { Component, OnInit } from '@angular/core';
import { ApiProvider } from '../services/api';

@Component({
  selector: 'app-historia',
  templateUrl: './historia.page.html',
  styleUrls: ['./historia.page.scss'],
})
export class HistoriaPage implements OnInit {

  constructor(public app: ApiProvider) { }

  ngOnInit() {
  }

  update() {
    this.app.updateSetting();
  }

}
