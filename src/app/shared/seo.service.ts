import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  // homepage meta
  metaDescription = 'स्वामी केशव अत्रि द्वारा केहि अध्यात्म चिन्तन';
  metaAuthor = 'Rishi Khatiwada';
  // tslint:disable-next-line:max-line-length
  metaKeywords =
    'swami, keshav, keshab, attri, keshabacharya, satsang, satsanga, स्वामी, केशव, अत्रि, अध्यात्म, चिन्तन, केशवाचार्य, सत्संग';
  // end homepage meta
  // fb meta
  ogUrl = 'https://www.swamikeshavattri.com';
  ogType = 'website';
  ogTitle = `श्री योगिराजेत्युपनामधन्यानन्तश्रीविभूषणेनालंकृत
  श्री कमलनयनाचार्य स्वामी पादानां
  श्री मुखोल्लासार्थमेतत् सञ्जाल पृष्ठम् ।।`;
  ogDescription = 'केहि अध्यात्म चिन्तन';
  // end fb meta

  constructor(
    private titleService: Title,
    private meta: Meta,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  updateMetaInfo(description, author, keywords) {
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'author', content: author });
    this.meta.updateTag({ name: 'keywords', content: keywords });
  }

  updateFacebookMetaInfo(ogUrl?, ogType?, ogTitle?, ogDescription?) {
    // if page refreshed
    this.meta.updateTag({ name: 'og:url', content: this.ogUrl });
    this.meta.updateTag({ name: 'og:type', content: this.ogType });
    this.meta.updateTag({ name: 'og:title', content: this.ogTitle });
    this.meta.updateTag({
      name: 'og:description',
      content: this.ogDescription
    });
    // end if page refreshed
    if (!ogUrl) {
      console.log('print ogurl' + ogUrl);
      this.getRouterEvent().subscribe(event => {
        this.meta.updateTag({ name: 'og:url', content: event['ogUrl'] });
        // this.titleService.setTitle('स्वामी केशव अत्रि | ' + event['title']);
      });
    } else {
      this.meta.updateTag({ name: 'og:url', content: ogUrl });
    }
    if (!ogType) {
      this.getRouterEvent().subscribe(event => {
        this.meta.updateTag({ name: 'og:type', content: event['ogType'] });
        // this.titleService.setTitle('स्वामी केशव अत्रि | ' + event['title']);
      });
    } else {
      this.meta.updateTag({ name: 'og:type', content: ogType });
    }
    if (!ogTitle) {
      this.getRouterEvent().subscribe(event => {
        this.meta.updateTag({ name: 'og:title', content: event['ogTitle'] });
        // this.titleService.setTitle('स्वामी केशव अत्रि | ' + event['title']);
      });
    } else {
      this.meta.updateTag({ name: 'og:title', content: ogTitle });
    }
    if (!ogDescription) {
      this.getRouterEvent().subscribe(event => {
        this.meta.updateTag({
          name: 'og:description',
          content: event['ogDescription']
        });
        // this.titleService.setTitle('स्वामी केशव अत्रि | ' + event['title']);
      });
    } else {
      this.meta.updateTag({ name: 'og:description', content: ogDescription });
    }
    this.meta.updateTag({
      name: 'og:image',
      content: 'https://swamikeshavattri.com/assets/icons/icon-512x512.png'
    });
  }

  updateTitle(title?: string) {
    console.log('in seo service (title)');
    if (!title) {
      this.getRouterEvent().subscribe(event => {
        this.titleService.setTitle('स्वामी केशव अत्रि | ' + event['title']);
      });
    } else {
      this.titleService.setTitle('स्वामी केशव अत्रि');
      // this.titleService.setTitle('स्वामी केशव अत्रि | ' + title);
    }
  }

  getRouterEvent() {
    return this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data)
    );
  }
}
