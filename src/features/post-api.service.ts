import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPostsResponse } from './interfaces/IPostsResponse';
import { IPost } from './interfaces/IPost';

@Injectable({
  providedIn: 'root',
})
export class PostApiService {

  private readonly apiUrl: string = 'https://dummyjson.com/posts';
  private http: HttpClient = inject(HttpClient);

  getPosts(limit: number, skip: number): Observable<IPostsResponse> {
    return this.http.get<IPostsResponse>(`${ this.apiUrl }?limit=${ limit }&skip=${ skip }`);
  }

  getPostById(id: number): Observable<IPost> {
    return this.http.get<IPost>(`${ this.apiUrl }/${ id }`)
  }

  createPost(post: Partial<IPost>): Observable<IPost> {
    return this.http.post<IPost>(`${ this.apiUrl }/add`, post);
  }

  updatePost(id: number, post: Partial<IPost>): Observable<IPost> {
    return this.http.put<IPost>(`${ this.apiUrl }/${ id }`, post);
  }

  deletePost(id: number): Observable<IPost> {
    return this.http.delete<IPost>(`${ this.apiUrl }/${ id }`);
  }

}