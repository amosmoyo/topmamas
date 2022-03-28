import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  authStatus: Subscription;

  loading: boolean;

  hide = true

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.authStatus = this.auth.getAuthStatus().subscribe({
      next: (data) => {
        this.loading = data;
      },
    });
  }

  save(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.loading = true;

    const data = {
      email: form.value.email,
      password: form.value.password,
    };

    this.auth.login(data);
  }

  ngOnDestroy(): void {
    this.authStatus.unsubscribe();
  }
}
