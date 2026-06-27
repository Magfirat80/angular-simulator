export interface IPost {
  id: number;
  title: string;
  body: string;
  tags: string[];
  views: number;
  userId: number;
  reactions: {
    likes: number;
    dislikes: number
  }
}