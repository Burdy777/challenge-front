import { Observable } from 'rxjs';


export interface EventRepository {
    login(name, password): Observable<any>;
}
