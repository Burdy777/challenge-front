import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Injectable()
export class StatService {
  constructor(private http: HttpClient) { }

  getTopCategorie() {
      return this.http.get('assets/api/volumes-0.json');
  }

  getAllCategories() {
    return this.http.get('assets/api/categories.json').toPromise();
}


getCategorie(id:number) {
    return this.http.get(`assets/api/volumes-${id}.json`);
}

getAverageCategories(listOfCategorie: any[]): number {
    const sum = listOfCategorie.reduce((prev, curr) => (prev + curr))
    return Math.floor(sum/listOfCategorie.length)
}

getVolumeByDate(listcategorie, dateSelected ) {
    return listcategorie.filter(month =>
        (moment(dateSelected['dateFrom']).valueOf() < moment(month['timespan']).valueOf() &&  
         moment(month['timespan']).valueOf() < moment(dateSelected['dateTo']).valueOf())
        || moment(dateSelected['dateFrom']).format('MM YYYY') === moment(month['timespan']).format('MM YYYY')
        || moment(dateSelected['dateTo']).format('MM YYYY') === moment(month['timespan']).format('MM YYYY'))
}
}