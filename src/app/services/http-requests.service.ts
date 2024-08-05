import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../enviroments/enviroments';
const enum news {
headline1 = 'everything',
headline2 = 'top-headlines',
}
@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {
  private baseUrl = environments.apiEndpoint;
  private apiKey = environments.apiKey;
  constructor(private http: HttpClient) { }


  
  getNews(query: string, pageSize: number = 30, page: number = 1): Observable<any> {
    const url = `${this.baseUrl}/${news.headline1}`;
    const params = new HttpParams()
      .set('q', query)
      .set('pageSize', pageSize.toString())
      .set('page', page.toString())
      .set('apiKey', this.apiKey);

    return this.http.get(url, { params });
  }

  getTopHeadlines(q: string = 'in'): Observable<any> {
    const url = `${this.baseUrl}/${news.headline2}`;
    const params = new HttpParams()
      .set('q', q)
      .set('apiKey', this.apiKey);

    return this.http.get(url, { params });
  }
}

