import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

try {
  await bootstrapApplication(AppComponent, appConfig);
} catch (error) {
  console.error('Failed to bootstrap application:', error);
  throw new Error('Application bootstrap failed', { cause: error });
}
