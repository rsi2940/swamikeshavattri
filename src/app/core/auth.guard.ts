import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // return this.auth.checkAllowWrite();
    return this.auth.user.pipe(
      take(1),
      map(user => {
        console.log(user);
        if (user) {
          if (user.allowWrite) {
            return !!user.allowWrite;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }),
      tap(loggedIn => {
        if (!loggedIn) {
          console.log('access denied');
          // console.log(loggedIn);
          this.router.navigate(['/blog']);
        } else {
          console.log('access granted');
          // console.log(loggedIn);
        }
      })
    );
  }
}
