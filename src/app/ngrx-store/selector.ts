import { createSelector, createFeatureSelector } from '@ngrx/store';
import { NewsState } from './news.reducer';

export const selectNewsState = createFeatureSelector<NewsState>('news');

export const selectAllNews = createSelector(
  selectNewsState,
  (state: NewsState) => state.news
);
