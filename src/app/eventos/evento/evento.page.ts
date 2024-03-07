import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiProvider } from '../../services/api';
import { WordpressService } from '../../services/wordpress.service';
import { NavExtrasService } from '../../services/nav.service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.page.html',
  styleUrls: ['./evento.page.scss'],
})
export class EventoPage {

  evento: any;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    public wp: WordpressService,
    public navExtras: NavExtrasService,
    public app: ApiProvider
  ) { }

  ionViewWillEnter() {
    // get data
    const id = this.route.snapshot.paramMap.get('id');
    const data = this.navExtras.getExtras();

    // get params
    if (data) {
      return this.evento = data;
    }

    // get in server
    this.loading = true;
    this.wp.getEvento(id)
    .subscribe(data => {
      this.loading = false;
      this.evento = Array.of(data)[0];
    });

    // Track a view
    this.app.firebase("Evento "+this.evento.title);
  }

  open(url) {
    this.app.openUrlApp(url);
  }

  share(url) {
    this.app.shareUrl(url);
  }

}
