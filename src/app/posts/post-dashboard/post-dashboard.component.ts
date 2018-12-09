// import { WINDOW } from '@ng-toolkit/universal';
import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.scss']
})
export class PostDashboardComponent implements OnInit {
  public currentUser = null;
  title: string;
  image: string = null;
  content: {
    para1: '';
    para2: '';
    para3: '';
  };
  para1 = '';
  para2 = '';
  para3 = '';
  buttonText = 'लेख सुरक्षित गर्नुहोस्';
  showPara2 = false;
  showPara3 = false;
  constructor(private auth: AuthService, private postService: PostService) {
    // console.log( this.auth.authState.displayName);
  }

  ngOnInit() {
    this.find();
  }
  async find() {
    await this.auth.user.subscribe(value => (this.currentUser = value));
  }
  createPost() {
    // console.log(this.currentUser);

    const data = {
      author: this.currentUser.displayName || this.currentUser.email,
      authorId: this.currentUser.uid,
      content: {
        para1: this.para1,
        para2: this.para2,
        para3: this.para3
      },
      image: this.image,
      published: new Date(),
      title: this.title
    };
    this.postService.create(data);
    this.title = '';
    this.para1 = '';
    this.para2 = '';
    this.para3 = '';
    this.buttonText = 'लेख सुरक्षित हुँदै...';
    setTimeout(() => (this.buttonText = 'लेख सुरक्षित गर्नुहोस्'), 3000);
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
    this.para2 = '';
    this.showPara3 = false;
    this.para3 = '';
  }
  removePara3() {
    this.showPara3 = false;
    this.para3 = '';
  }
}
