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

const routes: Routes = [
  { path: '', component: BioComponent },
  { path: 'blog', component: PostListComponent },
  { path: 'videos', component: VideosComponent },
  { path: 'blog/:id', component: PostDetailComponent },
  {
    path: 'dashboard',
    component: PostDashboardComponent,
    canActivate: [AuthGuard]
  },
  // { path: '', redirectTo: '/blog', pathMatch: 'full' },
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
    FeedbackComponent
  ],
  providers: [PostService, AuthGuard]
})
export class PostsModule {}
