// import { WINDOW } from '@ng-toolkit/universal';
import { Component, OnInit, Inject } from '@angular/core';
// import { Observable } from 'rxjs/observable';
import { Observable } from 'rxjs';
import { Post } from '../post';
import { PostService } from '../post.service';
import { MetaService } from 'src/app/shared/seo.service';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.scss']
})
export class BioComponent implements OnInit {
  posts$: Observable<Post[]>;
  // // homepage meta
  // metaDescription = 'स्वामी केशव अत्रि द्वारा केहि अध्यात्म चिन्तन';
  // metaAuthor = 'Rishi Khatiwada';
  // // tslint:disable-next-line:max-line-length
  // metaKeywords =
  //   'swami, keshav, keshab, attri, keshabacharya, satsang, satsanga, स्वामी, केशव, अत्रि, अध्यात्म, चिन्तन, केशवाचार्य, सत्संग';
  // // end homepage meta
  // // fb meta
  // ogUrl = 'https://www.swamikeshavattri.com';
  // ogType = 'article';
  // ogTitle = `श्री योगिराजेत्युपनामधन्यानन्तश्रीविभूषणेनालंकृत
  // श्री कमलनयनाचार्य स्वामी पादानां
  // श्री मुखोल्लासार्थमेतत् सञ्जाल पृष्ठम् ।।`;
  // ogDescription = 'केहि अध्यात्म चिन्तन';
  // // end fb meta

  constructor(private postService: PostService, private meta: MetaService) {}

  ngOnInit() {
    this.meta.updateTitle('स्वामी केशव अत्रि');
    this.meta.updateMetaInfo(
      this.meta.metaDescription,
      this.meta.metaAuthor,
      this.meta.metaKeywords
    );
    this.meta.updateFacebookMetaInfo();
    this.posts$ = this.postService.getLatest3Posts();
    // console.log(this);
    // console.log('Y = ' + window.scrollY);
  }
}
