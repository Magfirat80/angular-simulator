import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {

  private readonly languages: string[] = ['ru', 'en', 'ar'];
  private readonly defaultLanguage: string = 'ru';
  private readonly languageStorageKey: string = 'language';

  private readonly translateService: TranslateService = inject(TranslateService);
  private readonly localStorageService: LocalStorageService = inject(LocalStorageService);

  initLanguage(): void {
    const savedLanguage: string | null = this.localStorageService.getValue<string>(this.languageStorageKey);
    
    if (savedLanguage && this.languages.includes(savedLanguage)) {
      this.translateService.use(savedLanguage);
      return;
    }

    const browserLanguage: string = this.translateService.getBrowserLang() ?? this.defaultLanguage;
    const language: string = this.languages.includes(browserLanguage)
      ? browserLanguage
      : this.defaultLanguage;
    
    this.translateService.use(language);
  }

  changeLanguage(language: string): void {
    if (!this.languages.includes(language)) {
      return;
    }

    this.translateService.use(language);
    this.localStorageService.setValue(this.languageStorageKey, language);
  }

  getCurrentLanguage(): string | null {
    return this.translateService.getCurrentLang();
  }

}