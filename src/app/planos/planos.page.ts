import { Component, OnInit } from '@angular/core';
import { ApiProvider } from '../services/api';

import { DataService } from '../services/data.service';

@Component({
  selector: 'app-planos',
  templateUrl: './planos.page.html',
  styleUrls: ['./planos.page.scss'],
})
export class PlanosPage implements OnInit {

  dataConfig: any;

  constructor(public app: ApiProvider,
    private dataService: DataService) {
    this.dataConfig = this.dataService.dataConfig.planos;
  }

  ngOnInit() {
    // Track a screen view
    this.app.firebase("Planos");
  }

  open(url) {
    this.app.openUrlApp(url);
  }

}
