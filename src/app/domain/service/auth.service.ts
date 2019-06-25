import * as moment from "moment";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Storage } from '../../infrastructure/storage/storage.service';
import { EventRepository } from 'src/app/infrastructure/contracts/eventRepository';
import { tap } from 'rxjs/operators';
import { StorageRepository } from 'src/app/infrastructure/contracts/storageRepository';


@Injectable()
export class AuthService {
constructor(public eventRepository:EventRepository, public storageRepository: StorageRepository) {}

login(name, pass) {
   return this.eventRepository.login(name, pass).pipe(
     tap(res => {
       const expiresAt = moment().add(res.expiresIn, 'second');
       this.storageRepository.set('id_token', res.idToken);
       this.storageRepository.set('expires_at', JSON.stringify(expiresAt.valueOf()));
      })
   )
}

  public isLoggedIn() {
     return moment().isBefore(this.getExpiration()) && this.storageRepository.get("id_token");
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  logout() {
    this.storageRepository.remove("id_token");
    this.storageRepository.remove("expires_at");
  }

  // TODO: Deplace to other file
  getExpiration() {
      const expiration = this.storageRepository.get("expires_at");
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
  }    
}