import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber',
})
export class PhoneNumberPipe implements PipeTransform {

  transform(
    value: string, 
    mode: 'compact' | 'international' | 'national' | 'masked'
  ): string {
    if (!value) return '';
    
    const numbers: string = this.extractNumbers(value);
    if (!numbers) return '';

    switch(mode) {
      case 'compact':
        return this.compactValue(numbers);

      case 'international':
        return this.internationalValue(numbers);

      case 'national':
        return this.nationalValue(numbers);

      case 'masked':
        return this.maskedValue(numbers);

      default:
        return value;
    }
  }

  private extractNumbers(value: string): string {
    return value.replace(/\D+/g,'');
  }

  private compactValue(numbers: string): string {
    return ('+' + numbers);
  }

  private internationalValue(numbers: string): string {
    return (
      '+' + 
      numbers.slice(-16,-10) + 
      ' ' + 
      numbers.slice(-10, -7) + 
      ' ' + 
      numbers.slice(-7, -4) + 
      ' ' + 
      numbers.slice(-4, -2) + 
      ' ' + 
      numbers.slice(-2)
    );
  }
  
  private nationalValue(numbers: string): string {
    return (
      numbers.slice(-10, -7) + 
      ' ' + 
      numbers.slice(-7, -4) + 
      ' ' + 
      numbers.slice(-4, -2) + 
      ' ' + 
      numbers.slice(-2)
    );
  }

  private maskedValue(numbers: string): string {
    return (
      '+' + 
      numbers.slice(-16,-10) + 
      ' ' + 
      numbers.slice(-10, -7) + 
      ' ' + 
      '***' + 
      ' ' + 
      '**' + 
      ' ' + 
      numbers.slice(-2)
    );
  }

}