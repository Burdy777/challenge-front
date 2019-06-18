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
  average:number;
  averageOneYearAgo: number;

  constructor(public statService:StatService, private fb: FormBuilder) {}

  ngOnInit() {}

  ngOnChanges(changes:SimpleChanges) {
    this.buildForm();
    this.getTopCategorie();
  }


  private getTopCategorie() {
    const lastTwelveElement = this.topCategorieCurrent.slice(Math.max(this.topCategorieCurrent.length - 12, 1))
    const indexReference = this.topCategorieCurrent.indexOf(this.topCategorieCurrent[this.topCategorieCurrent.length - 12])
    const listOfTwelveElementOneYearAgo = this.topCategorieCurrent.slice(indexReference-12, indexReference)
    this.setMinMaxDate(this.topCategorieCurrent);

    const listOfLastTwelveElement = lastTwelveElement.map((item) => {
      return {volume: item.volume, label: listOfTwelveElementOneYearAgo.length > 0 ? moment(item.timespan).format('MMMM'): moment(item.timespan).format('MMMM Y')}
    })

    
    this.filterForm.get('dateFrom').setValue(moment(lastTwelveElement[0].timespan).toDate());
    this.filterForm.get('dateTo').setValue(moment(lastTwelveElement[lastTwelveElement.length -1].timespan).toDate())
    
    this.setGraph(listOfLastTwelveElement.map(item => item.volume),listOfLastTwelveElement.map(item => item.label),
    listOfTwelveElementOneYearAgo.map(item => item.volume));

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

  private setGraph(volume, month, volumeOneYearAgo = []) {
    this.topCategorieData = {
      labels: month,
      datasets: [
          {
              label: `The volume of search`,
              backgroundColor: '#42A5F5',
              borderColor: '#000000',
              data: volume
          }
          
      ]
    }
    this.average = this.statService.getAverageCategories(volume)
    if(volumeOneYearAgo.length > 0) {
      this.topCategorieData.datasets.push({
        label: 'The volume of search for the same period one year ago',
        backgroundColor: '#FFA500',
        borderColor: '#000000 ',
        data: volumeOneYearAgo
    })
    this.averageOneYearAgo = this.statService.getAverageCategories(volumeOneYearAgo)
    }
  }

  public submit(dateFiltred) {
    let listOfCategoriesOneYearAgo: any[]
    const listCategoriesFiltred = this.statService.getVolumeByDate(this.topCategorieCurrent, dateFiltred)
     const indexReference = this.topCategorieCurrent.findIndex(item => moment(listCategoriesFiltred[0].timespan).subtract(1,"year").calendar() === moment(item.timespan).calendar())
     if(indexReference !== -1) {
       // refaire la methode pour mettre a jour les liste
        listOfCategoriesOneYearAgo =  this.topCategorieCurrent.slice(indexReference, this.topCategorieCurrent.indexOf(listCategoriesFiltred[0]))

     }
       const listFinal = listCategoriesFiltred.map(item => {
         return {volume: item.volume, label: listOfCategoriesOneYearAgo.length > 0 ? moment(item.timespan).format('MMMM') : moment(item.timespan).format('MMMM Y')}
       })

       this.setGraph(listFinal.map(item => item.volume),listFinal.map(item => item.label), listOfCategoriesOneYearAgo.map(item => item.volume))
       console.log(listOfCategoriesOneYearAgo, listCategoriesFiltred)

  }

  

}
