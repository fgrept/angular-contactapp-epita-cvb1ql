import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from './loader.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loaderService:LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    this.loaderService.showLoader();
    return next.handle(request).pipe(
      // finalize 
      tap( (event: HttpEvent<any>) => {
        if(event instanceof HttpResponse || event instanceof HttpErrorResponse) {
          this.loaderService.hideLoader();
        }
      }) 
    );
  }
}
