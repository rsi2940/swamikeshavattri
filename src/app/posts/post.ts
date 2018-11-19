export class Post {
  id?: string;
  title: string;
  author: string;
  authorId: string;
  image?: string;
  published: Date;
  content: {
    para1: string;
    para2?: string;
    para3?: string;
  };
}
