import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ApiPrefixInterceptor } from './interceptors/prefix.interceptor';
import { DashboardEffects } from './store/dashboard/dashboard.effects';
import { dashboardReducer } from './store/dashboard/dashboard.reducer';
import { devicesReducer } from './store/devices/devices.reducer';
import { editModeReducer } from './store/edit-mode/edit-mode.reducer';
import { TabsEffects } from './store/tabs/tabs.effects';
import { tabsReducer } from './store/tabs/tabs.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([ApiPrefixInterceptor, AuthInterceptor])),
    provideStore({
      tabs: tabsReducer,
      dashboards: dashboardReducer,
      //cards: cardsReducer,
      devices: devicesReducer,
      editMode: editModeReducer
    }),
    provideEffects([DashboardEffects, TabsEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
    }),
  ],
};
