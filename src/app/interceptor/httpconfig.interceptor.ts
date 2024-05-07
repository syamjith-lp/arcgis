import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { from, Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const isExchangeUrl = request.url.includes(`${environment.swellApiUrl}auth/exchange`);
        const isOtpUrl = request.url.includes(`${environment.swellApiUrl}auth/2fa`);
        const isSwellApiUrl = request.url.includes(`${environment.swellApiUrl}`);

        const token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJ3eWxpZUBtb250ZWNpdG9tYWMuY29tIiwiaWF0IjoxNzE1MDU4MjMwLCJleHAiOjE3MTUwODcwMzAsInN1YiI6ImJ3eWxpZUBtb250ZWNpdG9tYWMuY29tIn0.Yb_GxEOwWEYA3rKEuj54-6fI5tbKqfFPbKUtKy6rsc4'

        if (token && !isExchangeUrl) {
            request = request.clone({ headers: request.headers.set('Authorization', token) });
        }

        // if (isExchangeUrl) {
        //     return from(this.injectMicrosoftToken(request, next));
        // }
        if (isSwellApiUrl) {
            request = request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) });
        }

        if (request.url.includes(environment.geoenrichmentUrl)) {
            return next.handle(request.clone({ headers: request.headers.delete('Authorization') }))
        }
        
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // This is intentional
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                if (error && error.status === 401 && !isOtpUrl) {
                    this.router.navigateByUrl('/auth?token=invalid');
                } else if (error.status === 403) {
                    // this.toastrService.warning('Session Expired');
                }
                return throwError(error);
            })
        );
    }


}