import { Injectable, Inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Storage } from 'src/app/infrastructure/storage/storage.service';
import { StorageRepository } from 'src/app/infrastructure/contracts/storageRepository';

@Injectable({
  providedIn: 'root'
})
export class AuthentInterceptor implements HttpInterceptor {

  constructor( @Inject('StorageRepository')public storageRepository:StorageRepository) {}
 intercept(req: HttpRequest<any>, next: HttpHandler) {
  const idToken = this.storageRepository.get('id_token')
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
