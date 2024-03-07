import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IonSlides, GestureController } from '@ionic/angular';

import { ApiProvider } from '../services/api';
import { WordpressService } from '../services/wordpress.service';
import { NavExtrasService } from '../services/nav.service';

import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';


@Component({
  selector: 'app-slide',
  templateUrl: './slide.page.html',
  styleUrls: ['./slide.page.scss'],
})
export class SlidePage implements OnInit {

  stories = [];
  today: any;
  load = false;
  interval;
  isProgress = 0;
  slideOpts = {
    initialSlide: +this.route.snapshot.paramMap.get('i'),
    autoplay: {
      delay: 5000
    }
  };

  @ViewChild('slides', {static: false}) slides: IonSlides;
  @ViewChild('swipeBox', { read: ElementRef, static:false }) swipeBox: ElementRef;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private el: ElementRef,
    private gestureCtrl: GestureController,
    public app: ApiProvider,
    public wp: WordpressService,
    public navExtras: NavExtrasService,
    private storage: NativeStorage,
    private screenOrientation: ScreenOrientation) { }
  

  ngOnInit() {
    // no fix screen
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);

    // clear data posts
    this.navExtras.clearExtras();

    // get data
    const data = this.navExtras.getStory();

    // get params
    if (data) {
      this.stories = data;
      return;
    }

    // get storys not in data
    this.wp.getStory()
    .subscribe(data => {
      this.stories = data;
    });

    // Track a screen view
    this.app.firebase("Slides");
  }

  ngAfterViewInit() {
    const gesture = this.gestureCtrl.create({
      el: this.swipeBox.nativeElement,
      gestureName: 'swipe',
      direction: 'y',
      onStart: detail => {
        this.onMove(detail);
      }
    });
    gesture.enable(true);
  }

  private onMove(detail) {
    const deltaY = detail.deltaY.toFixed(2);
    if (deltaY < -11.88) {
      this.slides.getActiveIndex().then(index => {
        this.go(this.stories[index].acf.url_externa, this.stories[index].acf.saibamais)
      });
    }
  }

  openInfo(url_externa, saibamais) {
    this.go(url_externa, saibamais)
  }

  start(slides) {
    slides.startAutoplay();
    this.show();
  }

  stop(slides) {
    slides.stopAutoplay();
    clearInterval(this.interval);
  }

  show() {
    clearInterval(this.interval);

    this.isProgress = 0.03;
    this.interval = setInterval(() => { this.incrementSeconds() }, 250);
  }

  incrementSeconds() {
    this.isProgress += 0.05;
    if (this.isProgress > 1.0) {
      clearInterval(this.interval);
    }
  }

  go(external, app) {
    if (external) {
      this.app.openUrlApp(external);
    } else if (app) {
      let url = '/eventos/' + app;
      this.router.navigate([url]);
    }
    this.app.firebaseEvent("ver_link_slide");
  }

  close() {
    this.router.navigate(['home']);
  }

}
