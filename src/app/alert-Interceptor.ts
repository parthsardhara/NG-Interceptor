import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { of } from "rxjs";
import { tap, catchError } from "rxjs/operators";


@Injectable()
export class demoInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const authorizedRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer')
    });

    return next.handle(authorizedRequest).pipe(
      tap(evt => {
        if (evt instanceof HttpResponse) {
          console.log('evt', evt);
          // alert('Please try again ...');
        }
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 500 || err.status === 504) {
            alert('Please try again ...');
          }
        }
        return of(err);
      }));
  }
}