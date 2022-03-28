import { Injectable } from '@angular/core';
import { Subject, Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Iuser } from './iuser';

const url = 'https://reqres.in/';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: any;

  private isAuth = false;

  private authStatusListener = new Subject<boolean>();
  
  private user: [] = [];

  private authTokenTimer: any

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuth;
  }

  getAuthStatus() {
    return this.authStatusListener.asObservable();
  }

  // private tokenTimer;

  redirectURL: any;

  // private user: Iuser;

  constructor(private http: HttpClient, private router: Router) {}

  signup(user: Iuser) {
    const headers = new HttpHeaders({
      'Content-TYpe': 'application/json',
    });

    this.http.post(`${url}api/register`, user, { headers }).subscribe({
      next: (data) => {
        this.router.navigate(['/users/login']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  login(user: Iuser): void {
    const headers = new HttpHeaders({
      'Content-TYpe': 'application/json',
    });

    this.http.post(`${url}api/login`, user, { headers }).subscribe({
      next: (data: any) => {
        // localStorage.setItem('token', data.token);
        const tokenData = data.token;
        const now = new Date();
        const expirationDate = new Date(
          now.getTime() + 600 * 1000
        );
  
        this.authTime(600000)
        this.storeToken(tokenData, expirationDate);
        // this.router.navigate(['/home'])

      },
      error: (err) => {
        console.log(err);
        this.authStatusListener.next(false)
      },
    });
  }

  storeToken(token: any, expirationDate:Date) {
    if (token) {
      this.token = token;
      this.isAuth = true;
      this.authStatusListener.next(true);

      this.setAuthData(this.token, expirationDate);

      if (this.redirectURL) {
        this.router.navigateByUrl(this.redirectURL);
      } else {
        this.router.navigate(['/home']);
      }
    }
  }


  logout() {
    this.token = null;
    this.isAuth = false;
    this.authStatusListener.next(false);
    this.clearAuthData();
    this.router.navigate(['/users/login']);
  }

  autoAuth() {
    const autoData = this.getAuthData()

    if(!autoData) {
      return;
    }

    const now = new Date();

    const expiresIn = autoData.dateInfo.getTime() - now.getTime();

    if(expiresIn > 0) {
      this.token = autoData.token;
      this.isAuth = true;
      this.authStatusListener.next(true);
      this.authTime(expiresIn)
    }
  }

  getUsers(page: Number){
    let queryParams = `api/users?page=${page}`;
    return this.http.get(`${url}${queryParams}`).pipe(map(x => x))

  }

  getUser(id: any) {
    return this.http.get(`${url}api/users/${id}`).pipe(map(x => x))
  }

  createUser(user: any) {
    return this.http.post(`${url}api/users`, user)
  }

  updateUser(user: any) {
    return this.http.put(`${url}api/users`, user)
  }

  // Local storage
  // store data on localstorage
  private setAuthData(token: string, expirationDate:Date) {
    localStorage.setItem('token', token);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }

  // clear auth data
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration')
  }

    // auth timeout
    private authTime(duration: number) {
      this.authTokenTimer = setTimeout(() => {
        this.logout();
      }, duration);
    }

   // get localstorage data

   private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem("expiration");
    if (!token ) {
      return;
    }

    const dateInfo = new Date(`${expirationDate}`)

    return {
      token,
      dateInfo
    };
  }
}
