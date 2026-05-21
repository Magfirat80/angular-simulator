import { Component, DestroyRef, EventEmitter, inject, Input, Output, type OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs';
import { PluralPipe } from "../app/plural.pipe";

@Component({
  selector: 'app-users-filter',
  imports: [ReactiveFormsModule, PluralPipe],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent implements OnInit {

  private destroyRef: DestroyRef = inject(DestroyRef);
  
  inputField: FormControl<string> = new FormControl<string>('', { nonNullable: true });

  @Input() filteredCountUsers: number = 0;

  @Output() usersFiltering: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    this.inputField.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        map((value: string) => value.toLowerCase().trim()),
        tap((value: string) => this.usersFiltering.emit(value)),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe();
  }

}