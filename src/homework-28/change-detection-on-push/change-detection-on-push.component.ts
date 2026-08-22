import { ChangeDetectionStrategy, Component, ChangeDetectorRef, inject } from '@angular/core';

@Component({
  selector: 'app-change-detection-on-push',
  imports: [],
  templateUrl: './change-detection-on-push.component.html',
  styleUrl: './change-detection-on-push.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeDetectionOnPushComponent {
  
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  count: number = 0;

  changeByMarkForCheck() {

    setTimeout(() => {
      this.count++;
      console.log('count:', this.count);

      this.cdr.markForCheck();
    }, 3000);
  };

  changeByDetectChanges() {

    setTimeout(() => {
      this.count++;
      console.log('count:', this.count);

      this.cdr.detectChanges();
    }, 3000);
  };

  ngDoCheck() {
    console.log('Change Detection');
  }

  ngOnInit() {
    this.cdr.detach();
  }

  changeByClick() {
    this.count++;
    console.log('count', this.count);
  }

  changeByPromise() {
    Promise.resolve().then(() => {
      this.count++;
      console.log('Promise count', this.count);
    })
  }

  changeByInterval() {
    setInterval(() => {
      this.count++;
      console.log('Interval count:', this.count);
    }, 3000)
  }

  changeByReattach() {
    this.cdr.reattach();
  }

}