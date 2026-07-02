import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, DestroyRef } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { IPost } from '../interfaces/IPost';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss',
})
export class PostDetailComponent implements OnInit {

  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private destroyRef: DestroyRef = inject(DestroyRef);

  post!: IPost;

  ngOnInit(): void {
    this.loadPost();
  }

  loadPost(): void {
    this.route.data.pipe(
      tap((data: Data) => this.post = data['post']),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

}