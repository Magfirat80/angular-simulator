import { Component, inject } from '@angular/core';
import { LoaderService } from '../app/loader.service';
import { AsyncPipe } from '@angular/common';
import type { Observable } from 'rxjs';

@Component({
  selector: 'app-loader',
  imports: [AsyncPipe],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {

  loaderService: LoaderService = inject(LoaderService);
  // loader$: Observable<boolean> = this.loaderService.isLoading$;

  // constructor() {
  //   this.loaderService.showSpinner();
  // }
  
}