import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, AlertController } from '@ionic/angular';

import { ApiProvider } from '../services/api';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;

  videos = null;
  channelID = this.app.youtube_channel_id;
  maxResults = '10';
  pageToken: string;
  googleToken: string = this.app.google_api;
  searchQuery = '';
  errorMessage = false;
  loading = false;
  dataConfig: any;
  skeletons = [0, 0, 0]; //qtd loading

  constructor(
    private app: ApiProvider,
    private dataService: DataService,
    private alertController: AlertController,
  ) {
    this.dataConfig = this.dataService.dataConfig.videos;
  }

  ngOnInit() {
    // get data
    this.fetchData();

    // Track a screen view
    this.app.firebase('Vídeos');
  }

  async fetchData() {
    this.getVideos(this.url());
  }

  channelChanged(event) {
    console.log('channel', event.detail.value);
  }

  url() {
    return (
      'https://www.googleapis.com/youtube/v3/search?order=date&part=id,snippet&channelId=' +
      this.channelID +
      '&type=video&maxResults=' +
      this.maxResults +
      '&key=' +
      this.googleToken
    );
  }

  getVideos(url) {
    this.errorMessage = false;

    this.app.get(url).subscribe(
      (data) => {
        this.pageToken = data.nextPageToken;
        this.videos = data.items;

        // Video Info
        // this.infoVideos(data);
      },
      () => {
        this.videos = [];
        this.errorMessage = true;
        this.onError();
      },
    );
  }

  async onError() {
    const alert = await this.alertController.create({
      cssClass: 'error-class',
      header: 'Ops',
      subHeader: 'Houve um erro',
      message: 'Tente novamente',
      buttons: ['OK'],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  open(id) {
    this.go(`https://www.youtube.com/watch?v=${id}`);
  }

  search() {
    this.videos = [];
    const url = `${this.url()}&q=${this.searchQuery}`;
    this.getVideos(url);
  }

  infoVideos(data) {
    data.items.map((entry) => {
      const videoUrl = `https://www.googleapis.com/youtube/v3/videos?part=id,snippet,contentDetails,statistics&id=
    ${entry.id.videoId}&key=${this.googleToken}`;
      this.app.get(videoUrl).subscribe((videoData) => {
        this.videos = this.videos.concat(videoData.items);
        return (entry.extra = videoData.items);
      });
    });
  }

  go(url) {
    this.app.openUrlApp(url);
  }

  goShalomtv() {
    this.app.openUrlApp('https://www.youtube.com/channel/UCUlIEMrwZsNHj5c-iKq7q7A');
  }

  doInfinite(event: any) {
    const url = `${this.url()}&q=${this.searchQuery}&pageToken=${this.pageToken}`;

    this.app.get(url).subscribe((data) => {
      this.videos = [...this.videos, ...data.items];

      this.pageToken = data.nextPageToken;
      if (!data.nextPageToken) {
        event.target.disabled = true;
      }
      event.target.complete();
    });
  }
}
