import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StatService {
  constructor(private http: HttpClient) { }

  getTopCategorie() {
      return this.http.get('./../../assets/api/volumes-0.json');
  }

  getAllCategories() {
    return this.http.get('assets/api/categories.json');
}

getCategorie(id:number) {
    return this.http.get(`assets/api/volumes-${id}.json`);
}
  
}