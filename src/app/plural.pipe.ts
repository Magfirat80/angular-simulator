import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plural',
})
export class PluralPipe implements PipeTransform {
  
  transform(value: number, firstForm: string, secondForm: string, thirdForm: string): string {
    let quantity!: number;

    if (value === null || isNaN(value)) {
      return 'error!!!!!'
    } else {
      quantity = Math.abs(Math.floor(value));
    }

    const word: string = this.getPluralWord(quantity, firstForm, secondForm, thirdForm);
    return `${quantity} ${word}`;
  }

  private getPluralWord(quantity: number, firstForm: string, secondForm: string, thirdForm: string): string {

    if (quantity === 0) {
      return thirdForm;
    }

    if (quantity % 100 >= 11 && quantity % 100 <= 14) {
      return thirdForm;
    }

    if (quantity % 10 === 1 ) {
      return firstForm;
    } else if (quantity % 10 >= 2 && quantity % 10 <= 4) {
      return secondForm;
    } else {
      return thirdForm;
    }
  }

}