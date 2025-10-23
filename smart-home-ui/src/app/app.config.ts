import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { routes } from './app.routes';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ApiPrefixInterceptor } from './interceptors/prefix.interceptor';
import { dashboardReducer } from './store/dashboard/dashboard.reducer';
import { tabsReducer } from './store/tabs/tabs.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([ApiPrefixInterceptor, AuthInterceptor])),
    provideStore({
      tabs: tabsReducer,
      dashboards: dashboardReducer,
      //cards: cardsReducer,
      //devices: devicesReducer,
    }),
  ],

  //provideEffects([DevicesEffects]), // сюда можно добавлять другие эффекты по мере необходимости
};
