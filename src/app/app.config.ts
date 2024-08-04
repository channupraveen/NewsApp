import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { reducer as newsReducer } from './ngrx-store/news.reducer';
import { NewsEffects } from './ngrx-store/news.effects';
import { environments } from './enviroments/enviroments';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideStore({ news: newsReducer }),
    provideEffects([NewsEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: environments.production,
    }),
  ],
};
