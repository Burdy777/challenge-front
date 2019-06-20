import * as moment from "moment";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserTokenId } from '../interface/user';
import {tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable()
export class AuthService {
constructor(private http: HttpClient) {}

login(name, pass):Observable<any>{
  // server return token
  return this.http.get<UserTokenId>('assets/api/auth-fake.json').pipe(
    tap(res => this.setSession(res))
  )
 }

  private setSession(authResult) {
      const expiresAt = moment().add(authResult.expiresIn,'second');
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }          

  public isLoggedIn() {
     return moment().isBefore(this.getExpiration()) && localStorage.getItem("id_token");
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
}
  getExpiration() {
      const expiration = localStorage.getItem("expires_at");
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
  }    
}