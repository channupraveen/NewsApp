import { NewsState } from "../ngrx-store/news.reducer";

// Define the root state
export interface AppState {
    news: NewsState;
  }
  