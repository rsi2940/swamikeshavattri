import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs/observable';
import { Observable } from 'rxjs';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.scss']
})
export class BioComponent implements OnInit {
  posts$: Observable<Post[]>;
  constructor(private postService: PostService) {}

  ngOnInit() {
    this.posts$ = this.postService.getLatest3Posts();
    // console.log(this);
    console.log('Y = ' + window.scrollY);
  }
}
