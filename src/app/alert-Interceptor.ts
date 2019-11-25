import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { of } from "rxjs";
import { tap, catchError, finalize, map } from "rxjs/operators";
import { LoaderService } from './loader.service';

export const token = 'abcd'
@Injectable()
export class demoInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoaderService) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log({req});

    this.loaderService.show();

    const authorizedRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer' + token),
    });


    // const authorizedRequest = req.clone({
    //   headers: req.headers.set('Authorization', 'Bearer' + token),
    //   // url: req.url.replace("https://", "http://"),
    //   setHeaders: { "X-Man": "Wolverine" },
    // });

    // const authorizedRequest = req.clone({
    //   headers: req.headers.set('Authorization', 'Bearer' + token),
    //   // url: req.url.replace("https://", "http://"),
    //   // setHeaders: { "X-Man": "Wolverine" },
    // });

    return next.handle(authorizedRequest).pipe(
      // map((event: HttpEvent<any>) => {
      //   if (event instanceof HttpResponse) {
      //     const camelCaseObject = {
      //       body: "quia et suscipit↵suscipit recusandae consequuntur expedita et cum↵reprehenderit molestiae ut ut quas totam↵nostrum rerum est autem sunt rem eveniet architecto",
      //       id: 1,
      //       title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      //       userId: 1,
      //     };
      //     const modEvent = event.clone({status: 300, body: camelCaseObject });
          
      //     return modEvent;
      //   }
      // }),
      tap(res => {
        if (res instanceof HttpResponse && res.status === 200) {
          // alert('Object created.');
          console.log('res', res);
        }
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 500 || err.status === 504) {
            // alert('Please try again ...');
          }
        }
        return of(err);
      }),
      finalize(() => {
        this.loaderService.hide();
      }));

      // finalize(() => console.log('finalize')));
  }
}