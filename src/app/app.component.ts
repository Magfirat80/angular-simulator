import { Component, inject } from '@angular/core';
import './training'
import { Color } from '../enums/Color';
import './collection'
import { FormsModule } from '@angular/forms';
import { MessageService } from './message.service';
import { LocalStorageService } from './local-storage.service';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { MessageComponent } from "../message/message.component";

@Component({
  selector: 'app-root',
  imports: [FormsModule, RouterOutlet, FooterComponent, HeaderComponent, MessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService, LocalStorageService]
})
export class AppComponent {
  
  localStorageService: LocalStorageService = inject(LocalStorageService);

  isLoading: boolean = true;

  constructor() {
    this.isMainColor(Color.YELLOW);
    this.saveLastVisitDate();
    this.saveEntriesCount();
    
    setTimeout(() => {
      this.isLoading = false;
    }, 400);
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