import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { usePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { Theme } from '../enums/Theme';
import { ITheme } from '../interfaces/ITheme';
import { ToggleSwitchDesignTokens } from '@primeuix/themes/types/toggleswitch';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  private getIsDarkModeFromStorage(): boolean {
    return this.localStorageService.getValue('isDark') ?? false;
  }

  private isDarkModeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    this.getIsDarkModeFromStorage(),
  );
  isDarkMode$: Observable<boolean> = this.isDarkModeSubject
    .asObservable()
    .pipe(tap((isDark: boolean) => document.documentElement.classList.toggle('mode-dark', isDark)));

  private getThemeFromStorage(): Theme {
    return (this.localStorageService.getValue<Theme>('theme') as Theme) ?? Theme.AURA;
  }

  private themeSubject: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(
    this.getThemeFromStorage(),
  );
  theme$: Observable<Theme> = this.themeSubject.asObservable();

  readonly presets: ITheme[] = [
    { name: 'aura', value: Theme.AURA, preset: Aura },
    { name: 'lara', value: Theme.LARA, preset: Lara },
    { name: 'nora', value: Theme.NORA, preset: Nora },
  ];

  customStyle: Partial<ToggleSwitchDesignTokens> = {
    colorScheme: {
      light: {
        root: {
          background: '{surface.0}',
          hoverBackground: '{surface.200}',
          checkedBackground: '{yellow.400}',
          checkedHoverBackground: '{yellow.300}',
        },
      },
      dark: {
        root: {
          background: '{surface.0}',
          checkedBackground: '{yellow.400}',
        },
      },
    },
  };

  toggleMode(isDarkMode: boolean): void {
    this.isDarkModeSubject.next(isDarkMode);
    this.localStorageService.setValue('isDark', isDarkMode);
    document.documentElement.classList.toggle('mode-dark', isDarkMode);
  }

  toggleTheme(themeName: Theme): void {
    this.themeSubject.next(themeName);
    this.localStorageService.setValue('theme', themeName);

    const selectedTheme: ITheme | undefined = this.presets.find(
      (preset: ITheme) => preset.value === themeName,
    );

    if (selectedTheme) {
      usePreset(selectedTheme.preset);
    }
  }

}