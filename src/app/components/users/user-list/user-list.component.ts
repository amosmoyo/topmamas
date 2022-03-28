import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {Subscription} from 'rxjs'
import { AuthService } from 'src/app/auth.service';
import { IuserInfo } from 'src/app/iuser';
import {PageEvent} from '@angular/material/paginator'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: IuserInfo[];

  usersPerPage = 6

  currentPage = 1;

  totalUsers = 12;

  pageSizeOptions = [1, 2, 3, 4, 5, 6]

  userObj: any

  isAuth: any;

  authStatus: Subscription;

  loading: boolean;

  userSub: Subscription;

  userId: string;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.loading = true;

    this.auth.getUsers(this.currentPage).subscribe({
      next:(dataUser: any) => {
        this.loading = false;
        this.users = dataUser.data;
        this.userObj = dataUser;
      },
      error:(err) => {
        console.log(err, 111);
      }
    })
  }

  onChangePage(pageData: PageEvent) {
    this.loading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.auth.getUsers(this.currentPage).subscribe({
      next:(dataUser: any) => {
        this.loading = false;
        this.users = dataUser.data
        this.userObj = dataUser;
      },
      error:(err) => {
        console.log(err, 111);
      }
    })
  }

 

}
