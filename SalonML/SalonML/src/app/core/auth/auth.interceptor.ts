import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var token = this.authService.getToken();

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req).pipe(
      catchError((error) => {
        // If token is invalid (such as being expired) then do a logout (remove the token)
        if (error instanceof HttpErrorResponse && error.status === 401) {
          // expect 401 errors in test admin mode
          if (this.authService.isTestAdmin)
            return throwError("An expected 401 was received in test admin mode");
          else {
            this.authService.logout();
            this.router.navigate(['/login']).then(() => {
              window.location.reload();
            });
          }
        }
        return throwError(error);
      })
    );
  }
}
