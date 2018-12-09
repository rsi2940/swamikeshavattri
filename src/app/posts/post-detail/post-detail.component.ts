import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';
import { Post } from '../post';
import { AuthService } from '../../core/auth.service';
import { MetaService } from 'src/app/shared/seo.service';
@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post: Post;
  editing = false;
  dataHref = '';
  shareHref = '';
  dataHrefStart = 'https://swamikeshavattri.com/blog/';
  shareHrefStart =
    'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fswamikeshavattri.com%2Fblog%2F';
  shareHrefEnd = '&amp;src=sdkpreparse';

  // shareHrefId = 'aeeV878fhEbQmxFMLH7j';

  //  content: {
  //   para1: '';
  //   para2: '';
  //   para3: '';
  // };
  para1 = '';
  para2 = '';
  para3 = '';
  buttonText = 'लेख सुरक्षित गर्नुहोस्';
  showPara2 = false;
  showPara3 = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    public auth: AuthService,
    private meta: MetaService
  ) {}

  ngOnInit() {
    this.getPost();
    this.meta.updateTitle();
    // console.log(this.auth.currentUserId);
  }
  getPost() {
    const id = this.route.snapshot.paramMap.get('id');
    this.shareHref = this.shareHrefStart + id + this.shareHrefEnd;
    this.dataHref = this.dataHrefStart + id;
    // console.log(this.shareHref);
    return this.postService.getPostData(id).subscribe(data => {
      console.log('ogurl' + id);
      this.meta.updateFacebookMetaInfo(
        'https://swamikeshavattri.com/blog/' + id,
        'article',
        data.title,
        data.content.para1
      );
      this.post = data;
    });
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
    this.buttonText = 'लेख सुरक्षित हुँदै...';
    setTimeout(() => (this.buttonText = 'लेख सुरक्षित गर्नुहोस्'), 3000);
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
