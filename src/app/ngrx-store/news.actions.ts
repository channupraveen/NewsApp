import { createAction, props } from '@ngrx/store';
import { Article } from '../models/new-list.model';

export const loadTopHeadlines = createAction(
  '[News API] Load Top Headlines',
  props<{ q: string }>()
);

export const loadTopHeadlinesSuccess = createAction(
  '[News API] Load Top Headlines Success',
  props<{ news: Article[] }>()
);

export const loadTopHeadlinesFailure = createAction(
  '[News API] Load Top Headlines Failure',
  props<{ error: string }>()
);

export const loadNews = createAction(
  '[News API] Load News',
  props<{ query: string }>()
);

export const loadNewsSuccess = createAction(
  '[News API] Load News Success',
  props<{ news: Article[] }>()
);

export const loadNewsFailure = createAction(
  '[News API] Load News Failure',
  props<{ error: string }>()
);
