import { Component, DestroyRef, EventEmitter, inject, Output, type OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs';

@Component({
  selector: 'app-users-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent implements OnInit {

  private destroyRef: DestroyRef = inject(DestroyRef);
  
  inputField: FormControl<string> = new FormControl<string>('', { nonNullable: true });

  @Output() usersFilteringRequested: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    this.inputField.valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map((valueMap: string) => valueMap.toLowerCase().trim()),
      tap((valueTap: string) => this.usersFilteringRequested.emit(valueTap)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

}