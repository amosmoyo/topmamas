import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators'

@Injectable()
export class UserInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');

    if ( token ) {
      const modefiedReq: HttpRequest<any> = req.clone({
        headers: req.headers.set('Authorization', token)
      });

      return next.handle(modefiedReq).pipe(
        tap(event => {
          if (event instanceof HttpResponse ) {
            console.log(event.body);
          }
        })
      );
    }

    return next.handle(req);
  }
}
