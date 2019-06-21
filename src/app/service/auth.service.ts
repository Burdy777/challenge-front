import * as moment from "moment";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserTokenId } from '../interface/user';
import {tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Storage } from './storage.service';


@Injectable()
export class AuthService {
constructor(private http: HttpClient, public storage: Storage) {}

login(name, pass):Observable<any>{
  // server return token
  return this.http.get<UserTokenId>('assets/api/auth-fake.json').pipe(
    tap(res => this.setSession(res))
  )
 }

  private setSession(authResult) {
      const expiresAt = moment().add(authResult.expiresIn,'second');
      this.storage.set('id_token', authResult.idToken);
      this.storage.set("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }          

  public isLoggedIn() {
     return moment().isBefore(this.getExpiration()) && this.storage.get("id_token");
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }

  logout() {
    this.storage.remove("id_token");
    this.storage.remove("expires_at");
  }

  getExpiration() {
      const expiration = this.storage.get("expires_at");
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
  }    
}