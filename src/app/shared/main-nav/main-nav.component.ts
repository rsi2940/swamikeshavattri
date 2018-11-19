import { Component, OnInit, ViewChild } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { AuthService, User } from '../../core/auth.service';
import { callNgModuleLifecycle } from '@angular/core/src/view/ng_module';
import { pipe } from '@angular/core/src/render3/pipe';
import { Router } from '@angular/router';
import { error } from '@angular/compiler/src/util';
import { MatMenuTrigger } from '@angular/material';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));
  @ViewChild(MatMenuTrigger)
  trigger: MatMenuTrigger;

  constructor(
    private router: Router,
    public auth: AuthService,
    private breakpointObserver: BreakpointObserver
  ) {}
  ngOnInit() {
    // this.scrollMe('feedback');
  }
  async scrollMeFeedback(element = 'feedback') {
    const elementId = document.getElementById(element);
    if (elementId) {
      elementId.scrollIntoView({
        behavior: 'smooth'
      });
    } else {
      await this.router.navigate(['']);
      await setTimeout(this.scrollMeFeedback, 500);
      // this.scrollMeFeedback(element);
    }
  }
  async scrollMeHome(element = 'home') {
    const elementId = document.getElementById(element);
    if (elementId) {
      elementId.scrollIntoView({
        behavior: 'smooth'
      });
    } else {
      await this.router.navigate(['']);
    }
  }
}
