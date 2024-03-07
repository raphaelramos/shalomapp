import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';

import { ApiProvider } from '../services/api';
import { DatabaseService } from "../services/database.service";
import { WordpressService } from "../services/wordpress.service";
import { NavExtrasService } from "../services/nav.service";

import { Insomnia } from "@awesome-cordova-plugins/insomnia/ngx";

@Component({
  selector: "app-post",
  templateUrl: "./post.page.html",
  styleUrls: ["./post.page.scss"],
})
export class PostPage implements OnInit {
  video: boolean;
  src: any;
  id: string;
  loading = false;
  errorMessage = false;
  news: any | null = null;
  items: any = [];
  category = "";
  isInternet: boolean = true;

  constructor(
    private route: ActivatedRoute,
    public alertController: AlertController,
    public app: ApiProvider,
    private database: DatabaseService,
    private wp: WordpressService,
    public navExtras: NavExtrasService,
    private platform: Platform,
    private insomnia: Insomnia
  ) {}

  ionViewDidEnter() {
    this.isInternet = this.app.isOnline();
  }

  ngOnInit() {
    // no block screen
    this.insomnia.keepAwake().then();

    this.id = this.route.snapshot.paramMap.get("id");
    const data = this.navExtras.getExtras();

    // get params
    if (data) {
      this.news = data;

      //save offline
      this.platform.ready().then(() => {
        this.database.saveNews(data);
      });
      return;
    }

    // get in server
    this.getData();
  }

  async getData() {
    this.loading = true;
    this.errorMessage = false;
    if (this.app.isOnline()) {
      this.wp.getPostContent(this.id).subscribe(
        (res) => {
          this.loading = false;
          this.news = res;

          //save offline
          this.database.saveNews(res);
        },
        (error) => {
          console.log("erro", error);
          this.errorMessage = true;
        }
      )
    } else {
      // Return the cached data from Storage
      this.database.savedNew(this.id).then((result) => {
        this.loading = false;
        this.news = result[0];
      });
    }

    // Track a view
    this.app.firebase("Estudo " + this.news.title.rendered);
  }

  share(url) {
    this.app.shareUrl(url);
    this.app.firebaseEvent("compartilhar_estudo");
  }

  update() {
    this.app.updateSetting();
  }
}
