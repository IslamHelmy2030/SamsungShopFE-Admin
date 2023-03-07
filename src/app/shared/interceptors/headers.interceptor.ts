import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const user = this.authService.getUserStoredData();
    const isApiUrl = request.url.startsWith(environment.APIURL);
    if (user && isApiUrl) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${user.message}` },
      });
    }
    return next.handle(request);
  }
}
