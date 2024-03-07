import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { ApiProvider } from './api';

@Injectable({
  providedIn: 'root',
})
export class WordpressService {
  totalPosts = null;
  pages: any;
  stories: any;
  urlEvents = `${this.app.scc_base_url}wp-json/tribe/events/v1/events`;

  constructor(
    public app: ApiProvider,
    public http: HttpClient,
  ) {}

  getPosts(page = 1, category = null): Observable<any[]> {
    const options = {
      observe: 'response' as 'body',
      params: {
        categories: category,
        per_page: 4,
        page: page,
      },
    };

    return this.http.get<any[]>(`${this.app.wordpress_api_url}posts?_embed`, options).pipe(
      map((resp) => {
        this.pages = resp['headers'].get('x-wp-totalpages');
        this.totalPosts = resp['headers'].get('x-wp-total');

        const data = resp['body'];
        return data;
      }),
      take(1),
    );
  }

  getSlugId(slug): Observable<any> {
    const options = {
      observe: 'response' as 'body',
      params: {
        slug: slug,
      },
    };

    return this.http.get<any[]>(`${this.app.wordpress_api_url}posts`, options).pipe(
      map((resp) => {
        const data = resp['body'];
        return data[0].id;
      }),
      take(1),
    );
  }

  getSlugIdEvent(slug): Observable<any> {
    const options = {
      observe: 'response' as 'body',
      params: {
        slug: slug,
      },
    };

    return this.http.get<any[]>(`${this.urlEvents}`, options).pipe(
      map((resp) => {
        const data = resp['body'];
        return data.events[0].id;
      }),
      take(1),
    );
  }

  getPostContent(id) {
    return this.http.get(`${this.app.wordpress_api_url}posts/${id}`);
  }

  geteventos(): any {
    return this.http.get(this.urlEvents).pipe(take(1));
  }

  getEvento(id: any) {
    const url = `${this.urlEvents}/${id}`;
    return this.http.get<any>(url).pipe(take(1));
  }

  getHome(): any {
    return this.http.get(this.app.scc_base_url + 'wp-json/shalomapp/v1/home').pipe(take(1));
  }

  getInfo(): any {
    return this.http.get(this.app.scc_base_url + 'wp-json/shalomapp/v1/info').pipe(take(1));
  }

  getStory(): any {
    return this.http.get(this.app.scc_base_url + 'wp-json/app/v3/stories').pipe(take(1));
  }
}
