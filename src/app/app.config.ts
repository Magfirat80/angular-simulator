import { LanguageService } from '../services/language.service';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
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
import { authInterceptor } from '../features/auth/interceptors/auth.interceptor';
import { AuthService } from '../features/auth/services/auth.service';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { APP_CONFIG } from '../tokens/app-config.token';
import { IAppConfig } from '../interfaces/IAppConfig';

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

const applicationConfig: IAppConfig = {
  companyName: 'румтибет',
  enableLogs: true,
  enableNotifications: true,
  enableTheming: true,
  sessionTimeout: 600,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: {
        dateFormat: 'dd.MM.yyyy HH:mm',
      },
    },
    {
      provide: APP_CONFIG,
      useValue: applicationConfig,
    },
    
    provideRouter(routes),
    
    provideZoneChangeDetection(),
    
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: './i18n/',
        suffix: '.json',
      }),
    }),
    
    providePrimeNG({
      theme: {
        preset: applyThemeFromStorage(),
        options: {
          darkModeSelector: '.mode-dark'
        }
      }
    }),

    provideHttpClient(
      withInterceptors([loggingInterceptor, authInterceptor, errorInterceptor])
    ),

    provideAppInitializer(() => {
      const authService: AuthService = inject(AuthService);
      const languageService: LanguageService = inject(LanguageService);

      languageService.initLanguage();

      return authService.init();
    }),
  ],
};