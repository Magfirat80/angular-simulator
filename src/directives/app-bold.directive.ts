import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appBold]',
})
export class AppBoldDirective {

  @HostBinding('style.fontWeight') fontWeight = 'bold'; 

  @HostListener('mouseenter')
  onEnter(): void {
    this.fontWeight = '900';
  }

  @HostListener('mouseleave')
  onLeave(): void {
    this.fontWeight = 'bold';
  }
  
}