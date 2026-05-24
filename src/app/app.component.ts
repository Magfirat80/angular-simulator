import { Component, inject } from '@angular/core';
import './training';
import { Color } from '../enums/Color';
import './collection';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from '../services/local-storage.service';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { MessageComponent } from '../message/message.component';
import { LoaderComponent } from '../loader/loader.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    RouterOutlet,
    FooterComponent,
    HeaderComponent,
    MessageComponent,
    LoaderComponent,
    FontAwesomeModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  faCoffee: IconDefinition = faCoffee;

  localStorageService: LocalStorageService = inject(LocalStorageService);

  constructor() {
    this.isMainColor(Color.YELLOW);
    this.saveLastVisitDate();
    this.saveEntriesCount();
  }

  private isMainColor(color: Color): boolean {
    const mainColors: Color[] = [Color.RED, Color.GREEN, Color.BLUE];
    return mainColors.includes(color);
  }

  private saveLastVisitDate(): void {
    this.localStorageService.setValue('last-visit-date', new Date().toString());
  }

  private saveEntriesCount(): void {
    let entriesCount: number = Number(this.localStorageService.getValue('entries-count')) || 0;
    entriesCount++;
    this.localStorageService.setValue('entries-count', String(entriesCount));
  }
  
}