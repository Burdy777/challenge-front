import { Component, OnInit, createPlatformFactory } from '@angular/core';
import { StatService } from './service/stats.service';
import * as moment from 'moment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  topCategorieCurrent:any[];
  topCategorieData: any;
  value: any;
  maxDateValue:any;
  minDateValue:any;
  filterForm: FormGroup;

  constructor(public statService:StatService, private fb: FormBuilder) {}

  ngOnInit() {
    this.getTopCategorie();
    this.buildForm();
  }


  private getTopCategorie() {
    this.statService.getTopCategorie().subscribe((topCategorie:Array<any>) => {
    this.topCategorieCurrent = topCategorie;
    this.setMinMaxDate(topCategorie);
    const lastTwelveElement = topCategorie.slice(Math.max(topCategorie.length - 12, 1))
    const listOfLastTwelveElement = lastTwelveElement.map((item) => {
      return {volume: item.volume, label: moment(item.timespan).format('MMMM Y')}
    })
    this.setGraph(listOfLastTwelveElement.map(item => item.volume),listOfLastTwelveElement.map(item => item.label));
    this.filterForm.get('dateFrom').setValue(moment(lastTwelveElement[0].timespan).toDate());
    this.filterForm.get('dateTo').setValue(moment(lastTwelveElement[lastTwelveElement.length -1].timespan).toDate())
    
    })
  }

   buildForm() {
    this.filterForm = this.fb.group({
      dateFrom: [ null, Validators.required],
      dateTo: [null, Validators.required]
    })
  }

  private setMinMaxDate(categorie: any[]) {
    this.minDateValue = moment(categorie[0].timespan).toDate()
    this.maxDateValue = moment(categorie[categorie.length - 1].timespan).toDate();
    
  }

  private setGraph(volume, labels) {
    this.topCategorieData = {
      labels: labels,
      datasets: [
          {
              label: 'Volume recherche mots-clefs',
              backgroundColor: '#42A5F5',
              borderColor: '#000000',
              data: volume
          }
      ]
    }
  }

  public submit(dateFiltred) {
    const listOfCategorieFiltred = this.topCategorieCurrent.filter(month =>
       moment(dateFiltred['dateFrom']).valueOf() < moment(month['timespan']).valueOf() &&  
       moment(month['timespan']).valueOf() < moment(dateFiltred['dateTo']).valueOf());

       const listFinal = listOfCategorieFiltred.map(item => {
         return {volume: item.volume, label: moment(item.timespan).format('MMMM Y')}
       })
       this.setGraph(listFinal.map(item => item.volume),listFinal.map(item => item.label))
  }

  

  
}
