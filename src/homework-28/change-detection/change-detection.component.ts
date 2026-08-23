import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { tap } from 'rxjs';

@Component({
  selector: 'app-change-detection',
  imports: [],
  templateUrl: './change-detection.component.html',
  styleUrl: './change-detection.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ChangeDetectionComponent {

  private http: HttpClient = inject(HttpClient);
  
  count: number = 0;

  onClick() {
    this.count++;
  }

  ngDoCheck() {
    console.log('Change Detection');
  }

  changeByTimeout() {
    setTimeout(() => {
      this.count++;
    }, 3000);
  };

  changeByPromise() {
    Promise.resolve().then(() => {
      this.count++;
    });
  };

  changeByHttp() {
    this.http.get('https://dummyjson.com/todos/1')
    .pipe(
      tap(() => {
        this.count++;  
      })
    ).subscribe();
  };

  changeByInterval() {
    setInterval(() => {
      this.count++;
    }, 3000)
  };

  changeMultiMetod() {
    this.count++;

    setTimeout(() => {
      this.count++;
    }, 1000);

    Promise.resolve().then(() => {
      this.count++;
    });

    this.http.get('https://dummyjson.com/todos/1')
    .pipe(
      tap(() => {
        this.count++;  
      })
    ).subscribe();
  }

}