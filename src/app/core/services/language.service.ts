import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from './local-storage.service';
import { Language } from '../enums/Language';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {

  readonly languages: Language[] = [
    Language.RU,
    Language.EN,
    Language.AR
  ];

  private defaultLanguage: Language = Language.RU;
  private languageStorageKey: string = 'language';

  private translateService: TranslateService = inject(TranslateService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  initLanguage(): void {
    const savedLanguage: Language | null = this.localStorageService.getValue<Language>(this.languageStorageKey);
    
    if (savedLanguage && this.languages.includes(savedLanguage)) {
      this.translateService.use(savedLanguage);
      return;
    }

    const browserLanguage: Language = this.translateService.getBrowserLang() as Language;

    const language: Language = this.languages.includes(browserLanguage)
      ? browserLanguage
      : this.defaultLanguage;
    
    this.translateService.use(language);
  }

  changeLanguage(language: Language): void {
    if (!this.languages.includes(language)) {
      return;
    }

    this.translateService.use(language);
    this.localStorageService.setValue(this.languageStorageKey, language);
  }

  getCurrentLanguage(): Language | null {
    return this.translateService.getCurrentLang() as Language | null;
  }

}