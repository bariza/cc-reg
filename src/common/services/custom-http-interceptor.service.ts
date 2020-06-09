import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import * as uuid from 'uuid';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class CustomHttpInterceptorService implements HttpInterceptor {

  constructor(private translateService: TranslateService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // TODO change this to conform to CS endpoint
    if (request.url.split('/')[1]  === 'api') {
      request = request.clone({headers: request.headers.set('Content-Type', 'application/json')});

      if (!request.headers.has('Accept')) {
        request = request.clone({headers: request.headers.set('requestId', uuid.v4())});
      }

      request = request.clone({headers: request.headers.set('language', this.translateService && this.translateService.currentLang && this.translateService.currentLang.toUpperCase())});
    }
    return next.handle(request);
  }

}
