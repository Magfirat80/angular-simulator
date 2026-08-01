import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { IGradientConfiguration } from '../interfaces/IGradientConfiguration';

@Directive({
  selector: '[appAnimatedGradient]',
})
export class AppAnimatedGradientDirective {

  @Input() options: IGradientConfiguration = {
    delay: 200,
    colors: ['blue', 'white', 'brown'],
    thickness: '8px',
  };

  private timer!: number; 
  isActive = false;
  
  @HostBinding('style.border-width')
  get borderWidth(): string | null {
    return this.isActive ? (this.options.thickness ?? '8px') : null;
  }

  @HostBinding('style.border-style')
  get borderStyle(): string | null {
    return this.isActive ? 'solid' : null;
  }

  @HostBinding('style.border-image')
  get borderImage(): string | null {
    const colorsString: string = this.options.colors?.join(', ') ?? 'blue, white, brown';
    return this.isActive ? `linear-gradient(90deg, ${ colorsString }) 1` : null;
  }

  @HostListener('mouseenter')
  onEnter(): void {
    clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      this.isActive = true;
    }, this.options.delay);
  }

  @HostListener('mouseleave')
  onLeave(): void {
    clearTimeout(this.timer); 
    this.isActive = false;
  }

}