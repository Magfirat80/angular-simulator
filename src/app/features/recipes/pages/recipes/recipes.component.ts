import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectError, selectLoading, selectRecipes } from '../../data-access/recipes.selectors';
import { loadRecipes } from '../../data-access/recipes.actions';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { IRecipe } from '../../interfaces/IRecipe';
import { IAppState } from '../../interfaces/IAppState';

@Component({
  selector: 'app-recipes',
  imports: [AsyncPipe],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss',
})
export class RecipesComponent implements OnInit {

  private readonly store: Store<IAppState> = inject(Store);

  readonly recipes$: Observable<IRecipe[]> = this.store.select(selectRecipes);
  readonly loading$: Observable<boolean> = this.store.select(selectLoading);
  readonly error$: Observable<string | null> = this.store.select(selectError);

  ngOnInit(): void {
    this.store.dispatch(loadRecipes());
  }

  reload(): void {
    this.store.dispatch(loadRecipes());
  }

}