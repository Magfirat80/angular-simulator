import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plural',
})
export class PluralPipe implements PipeTransform {
  
  transform(
    value: number,
    singular: string,
    singularGenitive: string,
    pluralGenitive: string
  ): string {
    const word: string = this.getPluralWord(value, singular, singularGenitive, pluralGenitive);
    return `${ value } ${ word }`;
  }

  private getPluralWord(
    value: number,
    singular: string,
    singularGenitive: string,
    pluralGenitive: string
  ): string {
    const lastTwoDigits: number = value % 100;
    const lastDigit:number = value % 10;
    
    if (value === 0 || (lastTwoDigits >= 11 && lastTwoDigits <= 14)) {
      return pluralGenitive;
    }

    if (lastDigit === 1) {
      return singular;
    } else if (lastDigit >= 2 && lastDigit <= 4) {
      return singularGenitive;
    } else {
      return pluralGenitive;
    }
  }

}