import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { StatService } from 'src/app/service/stats.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, OnChanges {
  @Input() topCategorieCurrent:any[];
  topCategorieData: any;
  maxDateValue:any;
  minDateValue:any;
  filterForm: FormGroup;

  constructor(public statService:StatService, private fb: FormBuilder) {}

  ngOnInit() {}

  ngOnChanges(changes:SimpleChanges) {
    this.buildForm();
    if(changes.topCategorieCurrent.currentValue) {
      this.getTopCategorie();

    }
  }


  private getTopCategorie() {
    const lastTwelveElement = this.topCategorieCurrent.slice(Math.max(this.topCategorieCurrent.length - 12, 1))
    const listOfLastTwelveElement = lastTwelveElement.map((item) => {
      return {volume: item.volume, label: moment(item.timespan).format('MMMM Y')}
    })
    this.setGraph(listOfLastTwelveElement.map(item => item.volume),listOfLastTwelveElement.map(item => item.label));
    this.filterForm.get('dateFrom').setValue(moment(lastTwelveElement[0].timespan).toDate());
    this.filterForm.get('dateTo').setValue(moment(lastTwelveElement[lastTwelveElement.length -1].timespan).toDate())
    this.setMinMaxDate(this.topCategorieCurrent);

   
  }

   buildForm() {
    this.filterForm = this.fb.group({
      dateFrom: [null, Validators.required],
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
              label: 'The volume of search by keywords',
              backgroundColor: '#42A5F5',
              borderColor: '#000000',
              data: volume
          }
      ]
    }
  }

  public submit(dateFiltred) {
    const listOfCategorieFiltred = this.topCategorieCurrent.filter(month =>
       (moment(dateFiltred['dateFrom']).valueOf() < moment(month['timespan']).valueOf() &&  
        moment(month['timespan']).valueOf() < moment(dateFiltred['dateTo']).valueOf())
       || moment(dateFiltred['dateFrom']).format('MM YYYY') === moment(month['timespan']).format('MM YYYY')
       )

       const listFinal = listOfCategorieFiltred.map(item => {
         return {volume: item.volume, label: moment(item.timespan).format('MMMM Y')}
       })
       this.setGraph(listFinal.map(item => item.volume),listFinal.map(item => item.label))
  }

  

}
