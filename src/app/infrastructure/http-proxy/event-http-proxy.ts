import { EventRepository } from '../contracts/eventRepository';
import { Observable, of } from 'rxjs';
import { UserTokenId } from 'src/app/domain/model/user';
import { HttpClient } from '@angular/common/http';

export class EventHttpProxy implements EventRepository {
    constructor(public http:HttpClient) {}

    login(name, password): Observable<any> {
        return this.http.get<UserTokenId>('assets/api/auth-fake.json');
    }
    
}