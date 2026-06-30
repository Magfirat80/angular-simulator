import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { IPost } from '../interfaces/IPost';
import { tap } from 'rxjs';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss',
})
export class PostDetailComponent implements OnInit {

  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  post!: IPost;

  ngOnInit(): void {
    this.loadPost();
  }

  loadPost(): void {
    this.route.data.pipe(
      tap((data: Data) => {
          this.post = data['post'];
        })
    ).subscribe();
  }

}