import { Component, inject } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { AsyncPipe } from '@angular/common';
import { faSpinner, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-loader',
  imports: [AsyncPipe, FontAwesomeModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  faSpinner: IconDefinition = faSpinner;

  loaderService: LoaderService = inject(LoaderService);

}