import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StatRepository } from '../contracts/statRepository';

export class EventStatsProxy implements StatRepository {
    constructor(public http:HttpClient) {}

 getTopCategorie() {
        return this.http.get('assets/api/volumes-0.json');
  }
  
  getAllCategories() {
      return this.http.get('assets/api/categories.json');
  }
  
  getCategorie(id:number) {
      return this.http.get(`assets/api/volumes-${id}.json`);
  }
    
}