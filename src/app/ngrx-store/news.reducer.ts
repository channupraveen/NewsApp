import { Action, createReducer, on } from '@ngrx/store';
import * as NewsActions from './news.actions';
import { Article } from '../models/new-list.model';

export interface NewsState {
  news: Article[];
  error: string | null;
}

export const initialState: NewsState = {
  news: [],
  error: null,
};

const newsReducer = createReducer(
  initialState,
  on(NewsActions.loadNewsSuccess, (state, { news }) => ({
    ...state,
    news: news, // Replace with new articles
    error: null, // Reset the error
  })),
  on(NewsActions.loadTopHeadlinesSuccess, (state, { news }) => ({
    ...state,
    news: news, // Replace with new articles
    error: null, // Reset the error
  })),
  on(NewsActions.loadNewsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(NewsActions.loadTopHeadlinesFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: NewsState | undefined, action: Action) {
  return newsReducer(state, action);
}
