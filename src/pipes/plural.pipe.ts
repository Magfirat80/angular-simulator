import { inject, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'plural',
  pure: false,
})
export class PluralPipe implements PipeTransform {

  private readonly translateService: TranslateService = inject(TranslateService);
  
  transform(value: number): string {
    const language: string | null = this.translateService.getCurrentLang();
    
    if (language === 'en') {
      const word: string = this.translateService.instant(
        value === 1 ? 'USERS_FILTER.CARD_ONE' : 'USERS_FILTER.CARD_FEW',
      );

      return `${value} ${word}`;
    }

    if (language === 'ar') {
      return `${value} ${this.getArabicPlural(value)}`;
    }
    
    const word: string = this.getRussianPlural(value);

    return `${ value } ${ word }`;
  }

  private getRussianPlural(value: number): string {
    const lastTwoDigits: number = value % 100;
    const lastDigit: number = value % 10;
    
    if (value === 0 || (lastTwoDigits >= 11 && lastTwoDigits <= 14)) {
      return this.translateService.instant('USERS_FILTER.CARD_MANY');
    }

    if (lastDigit === 1) {
      return this.translateService.instant('USERS_FILTER.CARD_ONE');
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
      return this.translateService.instant('USERS_FILTER.CARD_FEW');
    }

    return this.translateService.instant('USERS_FILTER.CARD_MANY');
  }

  private getArabicPlural(value: number): string {
    if (value === 1) {
      return this.translateService.instant('USERS_FILTER.CARD_ONE');
    }

    if (value === 2) {
      return this.translateService.instant('USERS_FILTER.CARD_TWO');
    }

    return this.translateService.instant('USERS_FILTER.CARD_MANY');
  }

}