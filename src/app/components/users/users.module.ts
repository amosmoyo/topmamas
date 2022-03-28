import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule,  ReactiveFormsModule} from '@angular/forms'
import {Routes, RouterModule} from '@angular/router'
import {MaterialModule} from '../material/material.module';
import { AccountComponent } from './account/account.component';
import { UserListComponent } from './user-list/user-list.component'
import {MatPaginatorModule} from '@angular/material/paginator';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditUserComponent } from './edit-user/edit-user.component'
import { AuthGurds } from 'src/app/Guard';

const routes:Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'account', component: AccountComponent, canActivate: [AuthGurds]},
  {path: 'userlist', component: UserListComponent, canActivate: [AuthGurds]},
  {path: 'create', component: CreateUserComponent, canActivate: [AuthGurds]},
  {path: 'edit/:id', component: EditUserComponent, canActivate: [AuthGurds]}
]

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    UserListComponent,
    CreateUserComponent,
    EditUserComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    MaterialModule,
    MatPaginatorModule,
    ReactiveFormsModule
  ],
  exports: [
    RouterModule
  ]
})
export class UsersModule { }
