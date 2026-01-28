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
    if (color === Color.RED || color === Color.GREEN || color === Color.BLUE) {
      return true;
    } else {
      return false;
    }
  }

  public saveLastVisit(): void {
    localStorage.setItem('dateLastVisit', new Date().toString());
  }

  public saveCountEntries(): void {
    const savedEntriesCount: string | null = localStorage.getItem('entryCount');
    let count: number;
    savedEntriesCount ? count = Number(savedEntriesCount) : count = 0;
    count++;
    localStorage.setItem('entryCount', String(count));
  }

  constructor() {
  console.log(this.isMainColor(Color.YELLOW));
  this.saveLastVisit();
  this.saveCountEntries();
  }
}