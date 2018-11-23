import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
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
