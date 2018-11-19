import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';
import { Post } from '../post';
import { AuthService } from '../../core/auth.service';
@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post: Post;
  editing = false;

  //  content: {
  //   para1: '';
  //   para2: '';
  //   para3: '';
  // };
  para1 = '';
  para2 = '';
  para3 = '';
  buttonText = 'लेख शुरक्षित गर्नुहोस्';
  showPara2 = false;
  showPara3 = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.getPost();
    console.log(this.auth.currentUserId);
  }
  getPost() {
    const id = this.route.snapshot.paramMap.get('id');
    return this.postService
      .getPostData(id)
      .subscribe(data => (this.post = data));
  }
  updatePost() {
    const formData = {
      title: this.post.title,
      content: {
        para1: this.post.content.para1,
        para2: this.post.content.para2,
        para3: this.post.content.para3
      }
    };
    const id = this.route.snapshot.paramMap.get('id');
    this.postService.update(id, formData);
    this.editing = false;
  }
  delete() {
    const id = this.route.snapshot.paramMap.get('id');
    this.postService.delete(id);
    this.router.navigate(['/blog']);
  }

  keyPress($event) {
    // console.log($event);
    $event.keyCode === 13 // focus to textarea after enter pressed
      ? document.querySelector('textarea').focus()
      : document.querySelector('input').focus();
  }

  addParagraph(para) {
    // add paragraph
    if (para === 'two') {
      this.showPara2 = true;
    } else if (para === 'three') {
      this.showPara3 = true;
    }
  }
  removeParagraph(para) {
    // remove paragraph and content
    if (para === 'two') {
      if (window.confirm('दोस्रो पङ्ति र तेस्रो पङ्ति मेटिनेछन् !!')) {
        this.removePara2();
      }
    } else if (para === 'three') {
      if (window.confirm('तेस्रो पङ्ति मेटिनेछ !!')) {
        this.removePara3();
      }
    }
  }
  removePara2() {
    this.showPara2 = false;
    this.post.content.para2 = '';
    this.showPara3 = false;
    this.post.content.para3 = '';
  }
  removePara3() {
    this.showPara3 = false;
    this.post.content.para3 = '';
  }
}
