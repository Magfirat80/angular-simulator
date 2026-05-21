import { Pipe, PipeTransform } from '@angular/core';
import { NumberFormatMode } from '../enums/NumberFormatMode';

@Pipe({
  name: 'phoneNumber',
})
export class PhoneNumberPipe implements PipeTransform {

  transform(value: string, mode: NumberFormatMode): string {
    if (!value) return '';

    const numbers: string = value.replace(/\D+/g,'');
    const codeCountryGroup: string = numbers.slice(-16,-10);
    const codeOperatorGroup: string = numbers.slice(-10, -7);
    const firstGroup: string = numbers.slice(-7, -4);
    const secondGroup: string = numbers.slice(-4, -2);
    const thirdGroup: string = numbers.slice(-2);

    switch (mode) {
      case NumberFormatMode.COMPACT:
        return `+${ numbers }`;
      case NumberFormatMode.INTERNATIONAL:
        return `+${ codeCountryGroup } ${ codeOperatorGroup } ${ firstGroup } ${ secondGroup } ${ thirdGroup }`;
      case NumberFormatMode.NATIONAL:
        return `${ codeOperatorGroup } ${ firstGroup } ${ secondGroup } ${ thirdGroup }`;
      case NumberFormatMode.MASKED:
        return `+${ codeCountryGroup } ${ codeOperatorGroup } *** ** ${ thirdGroup }`;
      default:
        return value;
    }
  }

}