import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { SQLitePorter } from '@awesome-cordova-plugins/sqlite-porter/ngx';

import { ErrorService } from 'src/app/shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    public http: HttpClient,
    public alertController: AlertController,
    private sqlite: SQLite,
    private sqlitePorter: SQLitePorter,
    private errorService: ErrorService,
  ) {}

  createDatabase() {
    this.sqlite
      .create({
        name: 'news.db',
        location: 'default',
      })
      .then((db: SQLiteObject) => {
        this.database = db;
        this.seedDatabase();
      })
      .catch((e) => {
        this.errorService.message(`Não foi possível criar o banco de dados: ${e}`);
      });
  }

  seedDatabase() {
    let sql =
      'create table IF NOT EXISTS `news` ([id] INTEGER PRIMARY KEY, [date] DATETIME, [link] TEXT, [title] TEXT, [wps_subtitle] TEXT, [excerpt] TEXT, [content] TEXT, [categories] INTEGER)';
    this.sqlitePorter
      .importSqlToDb(this.database, sql)
      .then((_) => {
        this.deleteExpire();
        console.log('create db');
        this.dbReady.next(true);
      })
      .catch((e) => console.error(e));
  }

  deleteExpire() {
    let query = 'delete from news where date < (now - 60);';
    return this.database.executeSql(query);
  }

  saveNews(news) {
    let data = [
      news.id,
      news.date,
      news.link,
      news.title.rendered,
      news.wps_subtitle,
      news.excerpt.rendered,
      news.content.rendered,
      news.categories[0],
    ];
    this.database
      .executeSql(
        'REPLACE INTO news (id, date, link, title, wps_subtitle, excerpt, content, categories) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        data,
      )
      .then((data) => {})
      .catch((e) => console.error('erro insert', e));
  }

  savedNews(categories): any {
    let query = `SELECT id, date, link, title, wps_subtitle, excerpt, content, categories FROM news WHERE categories = ?`;
    return this.database
      .executeSql(query, [categories])
      .then((data) => {
        let news: any[] = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            news.push({
              id: data.rows.item(i).id,
              date: data.rows.item(i).date,
              link: data.rows.item(i).link,
              wps_subtitle: data.rows.item(i).wps_subtitle,
              title: { rendered: data.rows.item(i).title },
              excerpt: { rendered: data.rows.item(i).excerpt },
              content: { rendered: data.rows.item(i).content },
              categories: [data.rows.item(i).categories],
            });
          }
          return news;
        } else {
          return [];
        }
      })
      .catch((e) => console.log('erro sql', e));
  }

  savedNew(id) {
    let query = `SELECT id, date, link, title, content FROM news WHERE id = ?`;
    return this.database
      .executeSql(query, [id])
      .then((data) => {
        let news: any[] = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            news.push({
              id: data.rows.item(i).id,
              date: data.rows.item(i).date,
              link: data.rows.item(i).link,
              title: { rendered: data.rows.item(i).title },
              content: { rendered: data.rows.item(i).content },
            });
          }
          return news;
        } else {
          return [];
        }
      })
      .catch((e) => console.log('erro sql', e));
  }

  clearNews() {
    let query = 'DROP TABLE news;';
    return this.database.executeSql(query);
  }
}
