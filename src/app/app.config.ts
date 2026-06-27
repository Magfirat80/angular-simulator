import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { routes } from './app.routes';
import { Theme } from '../enums/Theme';
import { Preset } from '@primeuix/themes/types';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loggingInterceptor } from './logging.interceptor';
import { errorInterceptor } from './error.interceptor';
import { loaderInterceptor } from './loader.interceptor';

function applyThemeFromStorage(): Preset {

  const themesMap: Record<Theme, Preset> = {
    [Theme.AURA]: Aura,
    [Theme.LARA]: Lara,
    [Theme.NORA]: Nora
  };

  const savedTheme: Theme = localStorage.getItem('theme') as Theme;
  const theme: Theme = savedTheme && savedTheme in themesMap ? savedTheme : Theme.AURA;
  return themesMap[theme];
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZoneChangeDetection(),
    
    providePrimeNG({
      theme: {
        preset: applyThemeFromStorage(),
        options: {
          darkModeSelector: '.mode-dark'
        }
      }
    }),

    provideHttpClient(
      withInterceptors([loaderInterceptor, loggingInterceptor, errorInterceptor])
    )
  ]
  
}