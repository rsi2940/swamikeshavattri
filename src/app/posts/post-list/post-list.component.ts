import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs/observable';
import { Observable } from 'rxjs';
import { Post } from '../post';
import { PostService } from '../post.service';
import { MetaService } from 'src/app/shared/seo.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts$: Observable<Post[]>;
  constructor(private postService: PostService, private meta: MetaService) {}

  ngOnInit() {
    this.meta.updateTitle();
    console.log('get ogurl');

    this.meta.updateFacebookMetaInfo();

    // (this.meta.ogUrl = ''),
    // (this.meta.ogType = ''),
    // (this.meta.ogTitle = ''),
    // (this.meta.ogDescription = '')

    this.posts$ = this.postService.getPosts();
    // console.log(this);
  }
}
