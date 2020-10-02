import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // on traite la requete entrante dans le middleware
    let cloneRequestWithToken = request;
    if(request.url.includes('https://gorest.co.in/public-api')) {
      cloneRequestWithToken = request.clone(
        {
        headers : request.headers.set('Authorization', 'Bearer '+ this.authService.getTokenFromLocalStorage()
        )}
      )
    }

    // continue 
    // vers l'interceptor suivant 
    // sinon vers vers le backend
    return next.handle(cloneRequestWithToken);
  }
}
