import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { routes } from './app.routes';
import { Theme } from '../enums/Theme';
import type { Preset } from '@primeuix/themes/types';

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
    })
  ]
  
}