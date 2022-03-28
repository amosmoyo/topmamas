import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentLat: any

  currentLong: any

  authStatus: Subscription;

  isAuth: boolean;

  tokenExpiration: any

  constructor(private auth: AuthService) { }

  ngOnInit() {
    // console.log(this.auth.getUser());
    this.isAuth = this.auth.getIsAuth();

    const now = new Date();

    const expirationDate = localStorage.getItem("expiration") ?  localStorage.getItem("expiration") : new Date(
      now.getTime() + 600 * 1000
    ); 

    const dateInfo = new Date(`${expirationDate}`)

    this.tokenExpiration = dateInfo;
    
    this.authStatus = this.auth.getAuthStatus().subscribe({
      next: (data) => {
        this.isAuth = data;
      }
    });

    if(!navigator.geolocation) {
      console.log('Location not supported')
    } else {
      navigator.geolocation.getCurrentPosition((p) => {
        this.currentLat = p.coords.latitude;
        this.currentLong = p.coords.latitude;
      })
    }

  }

  logout() {
    this.auth.logout();
  }

  ngOnDestroy(): void {
    this.authStatus.unsubscribe();
  }

}
