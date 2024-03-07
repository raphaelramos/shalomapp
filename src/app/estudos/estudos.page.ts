import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { IonInfiniteScroll, IonVirtualScroll } from '@ionic/angular';
import { Router } from '@angular/router';

import { ApiProvider } from '../services/api';
import { DatabaseService } from "../services/database.service";
import { WordpressService } from '../services/wordpress.service';
import { NavExtrasService } from '../services/nav.service';
import { ErrorService } from 'src/app/shared/error.service';

@Component({
  selector: "app-estudos",
  templateUrl: "./estudos.page.html",
  styleUrls: ["./estudos.page.scss"],
})
export class EstudosPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: false })
  infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonVirtualScroll, { static: false })
  virtualScroll: IonVirtualScroll;

  posts = null;
  page = 1;
  count = null;
  concluido = false;
  category = 34;
  dt = new Date();
  date;
  skeletons = [0, 0, 0, 0]; //qtd loading
  isInternet = true;
  errorMessage = false;

  constructor(
    private app: ApiProvider,
    private database: DatabaseService,
    private wp: WordpressService,
    public navExtras: NavExtrasService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.loadPosts();
    this.date =
      this.dt.getFullYear() +
      "" +
      ("0" + (this.dt.getMonth() + 1)).slice(-2) +
      "" +
      ("0" + (this.dt.getDate() + 1)).slice(-2);

    // Track a screen view
    this.app.firebase("Estudos para Células");
  }

  ionViewDidEnter() {
    if (this.isInternet != this.app.isOnline()) {
      this.loadPosts();
    }
  }

  async loadPosts() {
    this.isInternet = this.app.isOnline();
    this.errorMessage = false;

    if (this.isInternet) {
      this.wp.getPosts(1, this.category).subscribe(
        (res) => {
          this.count = this.wp.totalPosts;
          this.posts = res;
        },
        (error) => {
          this.posts = [];
          this.errorMessage = true;
          this.saved();
        }
      );
    } else {
      this.saved();
    }
  }

  loadMore(event) {
    this.page++;

    this.wp.getPosts(this.page, this.category).subscribe((res) => {
      this.posts = [...this.posts, ...res];
      event.target.complete();

      // Disable infinite loading when maximum reached
      if (this.page == this.wp.pages) {
        event.target.disabled = true;
        this.concluido = true;
      }
    });
  }

  saved() {
    // Return the cached data from Storage
    console.log("get saved");
    this.posts = [];
    this.database.savedNews(this.category).then(
      (result) => {
        console.log("result", result);
        this.posts = result;
      },
      (error: string) => {
        this.errorService.message(error);
        this.errorMessage = true;
      }
    );
  }

  semana(start, end) {
    if (this.date >= start && this.date <= end) {
      return true;
    }
  }

  go(id, post) {
    this.cd.detectChanges();
    this.navExtras.setExtras(post);
    this.router.navigate(["/post/", id]);
  }

  more() {
    this.app.openUrlApp("https://scc.org.br/estudos-pdf/");
    this.app.firebaseEvent("ver_estudos");
  }
}
