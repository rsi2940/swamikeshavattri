// import { NgtUniversalModule } from '@ng-toolkit/universal';
// import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';

import { FooterComponent } from './shared/footer/footer.component';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { PostsModule } from './posts/posts.module';
import { ServiceWorkerModule } from '@angular/service-worker';

const routes: Routes = [
  { path: '', loadChildren: './posts/posts.module#PostsModule' }
];

@NgModule({
  declarations: [AppComponent, FooterComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' }),
    // firebase.initializeApp(environment.firebase),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence({
      experimentalTabSynchronization: true
    }),
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
    PostsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
