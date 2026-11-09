import { Component, inject, OnInit } from '@angular/core';
import { QuotesStore } from '../../data-access/quotes.store';

@Component({
  selector: 'app-quotes-page',
  imports: [],
  templateUrl: './quotes-page.component.html',
  styleUrl: './quotes-page.component.scss',
})
export class QuotesPageComponent implements OnInit {

  readonly quotesStore: InstanceType<typeof QuotesStore> = inject(QuotesStore);

  ngOnInit(): void {
    this.quotesStore.loadQuotes();
  }
}