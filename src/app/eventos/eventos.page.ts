import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiProvider } from '../services/api';
import { WordpressService } from '../services/wordpress.service';
import { NavExtrasService } from '../services/nav.service';
import { ErrorService } from 'src/app/shared/error.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class eventosPage implements OnInit {
  
  eventos = null;
  total: number;
  skeletons = [0]; //qtd loading
  isInternet = true;

  constructor(public app: ApiProvider,
    public wp: WordpressService,
    public navExtras: NavExtrasService,
    private router: Router,
    private errorService: ErrorService
  ) { }

  ngOnInit() {
    // get data
    this.fetchData();

    // Track a screen view
    this.app.firebase("Eventos");
  }

  ionViewWillEnter() {
    if (this.isInternet != this.app.isOnline()) {
      this.fetchData();
    }
  }

  async fetchData() {
    this.isInternet = this.app.isOnline();;

    this.wp.geteventos()
    .subscribe(data => {
      this.eventos = data.events;
      this.total = data.total;
    }, (error: string) => {
      this.eventos = [];
      this.errorService.message(error);
    });
  }

  eventTapped(id, evento) {
    this.navExtras.setExtras(evento)
    this.router.navigate([`/eventos/${id}`]);
  }

}
