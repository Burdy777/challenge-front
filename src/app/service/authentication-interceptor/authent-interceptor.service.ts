import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthentInterceptor implements HttpInterceptor {

 intercept(req: HttpRequest<any>, next: HttpHandler) {
  const idToken = localStorage.getItem('id_token')
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
