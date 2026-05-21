import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plural',
})
export class PluralPipe implements PipeTransform {
  
  transform(value: number, firstForm: string, secondForm: string, thirdForm: string): string {
    const word: string = this.getPluralWord(value, firstForm, secondForm, thirdForm);
    return `${ value } ${ word }`;
  }

  private getPluralWord(value: number, firstForm: string, secondForm: string, thirdForm: string): string {

    if (value === 0) {
      return thirdForm;
    }

    if (value % 100 >= 11 && value % 100 <= 14) {
      return thirdForm;
    }

    if (value % 10 === 1 ) {
      return firstForm;
    } else if (value % 10 >= 2 && value % 10 <= 4) {
      return secondForm;
    } else {
      return thirdForm;
    }
  }

}