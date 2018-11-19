import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Feedback } from './feedback';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  feedbackCollection: AngularFirestoreCollection<Feedback>;
  feedbackDoc: AngularFirestoreDocument<Feedback>;

  constructor(private afs: AngularFirestore) {
    this.feedbackCollection = this.afs.collection('feedback');
    // this.latest3PostCollection = this.afs.collection('posts', ref =>
    //   ref.orderBy('published', 'desc').limit(3)
    // );
  }
  // getLatest3Posts() {
  //   return this.latest3PostCollection.snapshotChanges().pipe(
  //     map(actions =>
  //       actions.map(a => {
  //         const data = a.payload.doc.data() as Post;
  //         const id = a.payload.doc.id;
  //         return { id, ...data };
  //       })
  //     )
  //   );
  // }
  getFeedbacks() {
    return this.feedbackCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Feedback;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  getFeedbackData(id: string) {
    this.feedbackDoc = this.afs.doc<Feedback>(`feedback/${id}`);
    return this.feedbackDoc.valueChanges();
  }
  create(data: Feedback) {
    this.feedbackCollection.add(data);
  }
  getFeedback(id: string) {
    return this.afs.doc<Feedback>(`feedback/${id}`);
  }
  delete(id: string) {
    return this.getFeedback(id).delete();
  }
  update(id: string, formData) {
    return this.getFeedback(id).update(formData);
  }
}
