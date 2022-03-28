import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGurds implements CanActivate {

  isAuth: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router
    ) {
  }
  // tslint:disable-next-line: max-line-length
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const isUserAuth =  localStorage.getItem('token');

    if (!isUserAuth) {
      this.router.navigate(['/users/login']);
    }

    this.isAuth = true;

    return this.isAuth
  }

}