import { DestroyRef, inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { usePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { Theme } from '../enums/Theme';
import type { IThemes } from '../interfaces/IThemes';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  private isDarkModeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.localStorageService.getValue('isDark') ?? false); 
  isDarkMode$: Observable<boolean> = this.isDarkModeSubject.asObservable();

  private themeSubject: BehaviorSubject<Theme> = new BehaviorSubject<Theme>((this.localStorageService.getValue<Theme>('theme') as Theme) ?? Theme.AURA);
  theme$: Observable<Theme> = this.themeSubject.asObservable();

  private destroyRef: DestroyRef = inject(DestroyRef);

  readonly presets: IThemes[] = [
    { name: 'aura', value: Theme.AURA, preset: Aura },
    { name: 'lara', value: Theme.LARA, preset: Lara },
    { name: 'nora', value: Theme.NORA, preset: Nora }
  ];

  constructor() {
    const isDark: boolean = this.isDarkModeSubject.getValue();
    document.documentElement.classList.toggle('mode-dark', isDark);
  }
  
  toggleMode(eventValue: boolean): void {
    this.isDarkModeSubject.next(eventValue);
    this.localStorageService.setValue('isDark', eventValue);
    document.documentElement.classList.toggle('mode-dark', eventValue);
  }

  toggleTheme(eventValue: Theme): void {
    if (eventValue === null) return;
    this.themeSubject.next(eventValue);
    this.localStorageService.setValue('theme', eventValue);
    
    const selectedTheme = this.presets.find(p => p.value === eventValue);
    if (selectedTheme) {
      usePreset(selectedTheme.preset);
    }
  }

}