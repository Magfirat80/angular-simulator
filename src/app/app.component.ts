import { Component } from '@angular/core';
import './training'
import { Color } from '../enums/Color';
import './collection'

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  
  companyName: string = 'румтибет';

  public isMainColor(color: Color): boolean {
    const mainColors: Color[] = [Color.RED, Color.GREEN, Color.BLUE];
    return mainColors.includes(color);
  }

  public saveLastVisitDate(): void {
    localStorage.setItem('last-visit-date', new Date().toString());
  }

  public saveEntriesCount(): void {
    let entriesCount: number = Number(localStorage.getItem('entries-count')) || 0;
    entriesCount++;
    localStorage.setItem('entries-count', String(entriesCount));
  }

  constructor() {
  this.isMainColor(Color.YELLOW);
  this.saveLastVisitDate();
  this.saveEntriesCount();
  }
}