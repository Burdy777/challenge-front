import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Storage } from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthentInterceptor implements HttpInterceptor {

  constructor(public storage:Storage) {}
 intercept(req: HttpRequest<any>, next: HttpHandler) {
  const idToken = this.storage.get('id_token')
  if(idToken) {
    const cloned = req.clone({
      headers: req.headers.set("Authorization",
          "Bearer " + idToken)
  });
    return next.handle(cloned)
  } else {
    return next.handle(req)

  }
}


}
