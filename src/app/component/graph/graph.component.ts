import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { StatService } from 'src/app/service/stats.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Storage } from 'src/app/service/storage.service';

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

  constructor(public statService:StatService, private fb: FormBuilder, public storage:Storage) {}

  ngOnInit() {}

  ngOnChanges(changes:SimpleChanges) {
    this.buildForm();
    if(changes.topCategorieCurrent.currentValue) {
      this.getTopCategorie();
    }
  }


  private getTopCategorie() {
    let listMonthtInit:any[];
    let listOfTwelveElementOneYearAgo: any[];
    let listMonthFinal: any[]
    // if user has filtred before
    if(this.storage.has('userSelection')) {
      listMonthtInit = JSON.parse(this.storage.get('userSelection'))
      listOfTwelveElementOneYearAgo = JSON.parse(this.storage.get('userSelectionOneYearAgo'))
      this.setDate(moment(listOfTwelveElementOneYearAgo[0].timespan).add(1,"year").toDate(), moment(listOfTwelveElementOneYearAgo[listOfTwelveElementOneYearAgo.length -1].timespan).add(1,"year").toDate())

      listMonthFinal = listMonthtInit.map((item, index) => {
        return {volume: item.volume, label: listOfTwelveElementOneYearAgo.length > 0 ? 
          moment(listOfTwelveElementOneYearAgo[index].timespan).format('MMMM'): moment(item.timespan).format('MMMM Y')}
      })
    } else {
      listMonthtInit = this.topCategorieCurrent.slice(Math.max(this.topCategorieCurrent.length - 12, 1))
      const indexReference = this.topCategorieCurrent.indexOf(this.topCategorieCurrent[this.topCategorieCurrent.length - 12])
      listOfTwelveElementOneYearAgo = this.topCategorieCurrent.slice(indexReference-12, indexReference)
      this.setDate(moment(listMonthtInit[0].timespan).toDate(), moment(listMonthtInit[listMonthtInit.length -1].timespan).toDate())
      listMonthFinal = listMonthtInit.map((item) => {
        return {volume: item.volume, label: listOfTwelveElementOneYearAgo.length > 0 ?
           moment(item.timespan).format('MMMM'): moment(item.timespan).format('MMMM Y')}
      })
    }
   

    this.setMinMaxDate(this.topCategorieCurrent);
    this.setGraph(listMonthFinal.map(item => item.volume),listMonthFinal.map(item => item.label),
    listOfTwelveElementOneYearAgo.map(item => item.volume));

  }

   buildForm() {
    this.filterForm = this.fb.group({
      dateFrom: [null, Validators.required],
      dateTo: [null, Validators.required]
    })
  }


  private setMinMaxDate(categorie: any[]) {
    this.minDateValue = moment(categorie[13].timespan).toDate()
    this.maxDateValue = moment(categorie[categorie.length - 1].timespan).toDate();
  }

  private setDate(dateFrom, dateTo ) {
    this.filterForm.get('dateFrom').setValue(moment(dateFrom).toDate());
    this.filterForm.get('dateTo').setValue(moment(dateTo).toDate());
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
    // get date filtred
    const listCategoriesFiltred = this.statService.getVolumeByDate(this.topCategorieCurrent, dateFiltred)

     const indexReferenceFrom = this.topCategorieCurrent.findIndex(item => moment(listCategoriesFiltred[0].timespan).subtract(1,"year").calendar() === moment(item.timespan).calendar())
     const indexReferenceTo = this.topCategorieCurrent.findIndex(item => moment(listCategoriesFiltred[listCategoriesFiltred.length-1].timespan).subtract(1,"year").calendar() === moment(item.timespan).calendar())
     
     if(indexReferenceFrom !== -1) {
        listOfCategoriesOneYearAgo =  this.topCategorieCurrent.slice(indexReferenceFrom, indexReferenceTo+1)
     }
       const listFinal = listCategoriesFiltred.map(item => {
         return {volume: item.volume, label: listOfCategoriesOneYearAgo.length > 0 ? moment(item.timespan).format('MMMM') : moment(item.timespan).format('MMMM Y')}
       })
       
       this.storage.set('userSelection', JSON.stringify(listFinal));
       this.storage.set('userSelectionOneYearAgo', JSON.stringify(listOfCategoriesOneYearAgo))
       
       this.setGraph(listFinal.map(item => item.volume),listFinal.map(item => item.label), listOfCategoriesOneYearAgo.map(item => item.volume))
  }

  

}
