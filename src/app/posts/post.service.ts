import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Post } from './post';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postCollection: AngularFirestoreCollection<Post>;
  latest3PostCollection: AngularFirestoreCollection<Post>;
  postDoc: AngularFirestoreDocument<Post>;

  constructor(private afs: AngularFirestore) {
    this.postCollection = this.afs.collection('posts', ref =>
      ref.orderBy('published', 'desc')
    );
    this.latest3PostCollection = this.afs.collection('posts', ref =>
      ref.orderBy('published', 'desc').limit(3)
    );
  }
  getLatest3Posts() {
    return this.latest3PostCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Post;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }
  getPosts() {
    return this.postCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Post;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  getPostData(id: string) {
    this.postDoc = this.afs.doc<Post>(`posts/${id}`);
    return this.postDoc.valueChanges();
  }
  create(data: Post) {
    this.postCollection.add(data);
  }
  getPost(id: string) {
    return this.afs.doc<Post>(`posts/${id}`);
  }
  delete(id: string) {
    return this.getPost(id).delete();
  }
  update(id: string, formData) {
    return this.getPost(id).update(formData);
  }
}
