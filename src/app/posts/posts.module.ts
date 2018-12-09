import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PostService } from './post.service';
import { PostDashboardComponent } from './post-dashboard/post-dashboard.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostListComponent } from './post-list/post-list.component';
import { AuthGuard } from '../core/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BioComponent } from './bio/bio.component';
import { VideosComponent } from './videos/videos.component';
import { FeedbackComponent } from '../shared/feedback/feedback.component';
import { PrivacyPolicyComponent } from '../shared/privacy-policy/privacy-policy.component';

const routes: Routes = [
  {
    path: '',
    component: BioComponent,
    data: {
      title: 'स्वामी केशव अत्रि',
      description: 'स्वामी केशव अत्रि द्वारा केहि अध्यात्म चिन्तन',
      ogUrl: 'https://swamikeshavattri.com/',
      ogTitle: `श्री योगिराजेत्युपनामधन्यानन्तश्रीविभूषणेनालंकृत
    श्री कमलनयनाचार्य स्वामी पादानां
    श्री मुखोल्लासार्थमेतत् सञ्जाल पृष्ठम् ।।`,
      ogDescription: 'केहि अध्यात्म चिन्तन',
      ogType: 'website'
    }
  },
  {
    path: 'blog',
    component: PostListComponent,
    data: {
      title: 'लेखहरु',
      description: 'लेखहरु',
      ogUrl: 'https://swamikeshavattri.com/',
      ogTitle: `श्री योगिराजेत्युपनामधन्यानन्तश्रीविभूषणेनालंकृत
      श्री कमलनयनाचार्य स्वामी पादानां
      श्री मुखोल्लासार्थमेतत् सञ्जाल पृष्ठम् ।।`,
      ogDescription: 'केहि अध्यात्म चिन्तन',
      ogType: 'website'
    }
  },
  {
    path: 'videos',
    component: VideosComponent,
    data: {
      title: 'भिडियोहरु',
      description: 'भिडियोहरु',
      ogUrl: 'https://swamikeshavattri.com/',
      ogTitle: `श्री योगिराजेत्युपनामधन्यानन्तश्रीविभूषणेनालंकृत
    श्री कमलनयनाचार्य स्वामी पादानां
    श्री मुखोल्लासार्थमेतत् सञ्जाल पृष्ठम् ।।`,
      ogDescription: 'केहि अध्यात्म चिन्तन',
      ogType: 'website'
    }
  },
  {
    path: 'blog/:id',
    component: PostDetailComponent,
    data: {
      title: 'लेख',
      description: 'लेख'
    }
  },
  {
    path: 'dashboard',
    component: PostDashboardComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Dashboard',
      description: 'Admin Dashboard',
      ogUrl: 'https://swamikeshavattri.com/',
      ogTitle: `श्री योगिराजेत्युपनामधन्यानन्तश्रीविभूषणेनालंकृत
    श्री कमलनयनाचार्य स्वामी पादानां
    श्री मुखोल्लासार्थमेतत् सञ्जाल पृष्ठम् ।।`,
      ogDescription: 'केहि अध्यात्म चिन्तन',
      ogType: 'website'
    }
  },
  // { path: '', redirectTo: '/blog', pathMatch: 'full' },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
    data: {
      title: 'Privacy Policy',
      description: 'Privacy Policy',
      ogUrl: 'https://swamikeshavattri.com/',
      ogTitle: `श्री योगिराजेत्युपनामधन्यानन्तश्रीविभूषणेनालंकृत
  श्री कमलनयनाचार्य स्वामी पादानां
  श्री मुखोल्लासार्थमेतत् सञ्जाल पृष्ठम् ।।`,
      ogDescription: 'केहि अध्यात्म चिन्तन',
      ogType: 'website'
    }
  },
  { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    PostDashboardComponent,
    PostDetailComponent,
    PostListComponent,
    BioComponent,
    VideosComponent,
    FeedbackComponent,
    PrivacyPolicyComponent
  ],
  providers: [PostService, AuthGuard]
})
export class PostsModule {}
