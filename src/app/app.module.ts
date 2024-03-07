import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Insomnia } from '@awesome-cordova-plugins/insomnia/ngx';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { SQLitePorter } from '@awesome-cordova-plugins/sqlite-porter/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

import { ApiProvider } from './services/api';
import { DatabaseService } from './services/database.service';
import { DataService } from './services/data.service';
import { WordpressService } from './services/wordpress.service';
import { NavExtrasService } from './services/nav.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [HttpClientModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    NativeStorage,
    Insomnia,
    ScreenOrientation,
    SQLitePorter,
    SQLite,
    ApiProvider,
    DatabaseService,
    DataService,
    WordpressService,
    NavExtrasService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
