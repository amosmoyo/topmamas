import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {Routes, RouterModule} from '@angular/router'

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { NOTFOUNDComponent } from './components/notfound/notfound.component';
import { HttpErrorsComponent } from './components/http-errors/http-errors.component';
import { UserInterceptor } from './user.interceptor';
import {MaterialModule} from './components/material/material.module'

// import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import { ErrorInterCeptor } from './auth.interceptor';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'users', loadChildren: () => import('./components/users/users.module').then( m => m.UsersModule)},
  {path: '**', component: NOTFOUNDComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    NOTFOUNDComponent,
    HttpErrorsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  entryComponents: [HttpErrorsComponent],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass:UserInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterCeptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
