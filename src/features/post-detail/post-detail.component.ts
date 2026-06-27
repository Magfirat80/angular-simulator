import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  private route: ActivatedRoute = inject(ActivatedRoute);

  post: IPost | null = null;

  ngOnInit(): void {
    this.route.data.pipe(
      tap(({ post }) => {
        this.post = post as IPost;
      })
    ).subscribe();
  }

}