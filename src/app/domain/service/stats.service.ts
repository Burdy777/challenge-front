import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { StatRepository } from 'src/app/infrastructure/contracts/statRepository';

@Injectable()
export class StatService {
  constructor(public statRepository:StatRepository) { }

getTopCategorie() {
      return this.statRepository.getTopCategorie();
}

getAllCategories() {
    return this.statRepository.getAllCategories();
}

getCategorie(id:number) {
    return this.statRepository.getCategorie(id);
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