import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./api";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private auth: AuthService) {}

  public isLoggedIn(): Observable<boolean> {
    return new Observable<boolean>((subscriber) => {
      /*if (document.cookie.indexOf('connect.sid') < 0) {
        subscriber.next(false);
        subscriber.complete();
        return;
      }*/

      try {
        this.auth.getUserCompanyGet().subscribe((data) => {
          subscriber.next(!!data[0]);
          subscriber.complete();
        }, (error) => {
          subscriber.next(false);
          subscriber.complete();
        });
      } catch (e) {
        subscriber.next(false);
        subscriber.complete();
      }
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isLoggedIn();
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.isLoggedIn();
  }
}
