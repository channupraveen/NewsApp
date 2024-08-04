import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as NewsActions from './news.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpRequestsService } from '../services/http-requests.service';

@Injectable()
export class NewsEffects {
  constructor(
    private actions$: Actions,
    private httpreq: HttpRequestsService
  ) {}

  private isValidArticle(article: any): boolean {
    return (
      article.title !== '[Removed]' &&
      article.description !== '[Removed]' &&
      article.content !== '[Removed]' &&
      article.source.name !== '[Removed]' &&
      article.publishedAt !== '1970-01-01T00:00:00Z' &&
      article.url !== 'https://removed.com'
    );
  }

  loadNews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NewsActions.loadNews),
      mergeMap(action =>
        this.httpreq.getNews(action.query).pipe(
          map(news => ({
            ...news,
            articles: news.articles.filter(this.isValidArticle)
          })),
          map(filteredNews => NewsActions.loadNewsSuccess({ news: filteredNews.articles })),
          catchError(error => of(NewsActions.loadNewsFailure({ error })))
        )
      )
    )
  );

  loadTopHeadlines$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NewsActions.loadTopHeadlines),
      mergeMap(action =>
        this.httpreq.getTopHeadlines(action.q).pipe(
          map(news => ({
            ...news,
            articles: news.articles.filter(this.isValidArticle)
          })),
          map(filteredNews => NewsActions.loadTopHeadlinesSuccess({ news: filteredNews.articles })),
          catchError(error => of(NewsActions.loadTopHeadlinesFailure({ error })))
        )
      )
    )
  );
}