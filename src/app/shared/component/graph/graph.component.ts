import { Component, OnInit, Input, OnChanges, SimpleChanges, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { StatService } from 'src/app/domain/service/stats.service';
import { Storage } from 'src/app/infrastructure/storage/storage.service';
import { StorageRepository } from 'src/app/infrastructure/contracts/storageRepository';

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

  constructor(@Inject('StatService') public statService:StatService, private fb: FormBuilder, @Inject('StorageRepository')public storageRepository:StorageRepository) {}

  ngOnInit() {}

  ngOnChanges(changes:SimpleChanges) {
    this.buildForm();
    // fetch current value from the parent component 
    if(changes.topCategorieCurrent.currentValue) {
      this.getTopCategorie();
    }
  }


  private getTopCategorie() {
    let listMonthtInit:any[];
    let listOfTwelveElementOneYearAgo: any[];
    let listMonthFinal: any[]
    // edit user
    if(this.storageRepository.has('userSelection')) {
      listMonthtInit = JSON.parse(this.storageRepository.get('userSelection'))
      listOfTwelveElementOneYearAgo = JSON.parse(this.storageRepository.get('userSelectionOneYearAgo'))
      this.setDate(moment(listOfTwelveElementOneYearAgo[0].timespan).add(1,"year").toDate(), moment(listOfTwelveElementOneYearAgo[listOfTwelveElementOneYearAgo.length -1].timespan).add(1,"year").toDate())

      listMonthFinal = listMonthtInit.map((item, index) => {
        return {volume: item.volume, label: listOfTwelveElementOneYearAgo.length > 0 ? 
          moment(listOfTwelveElementOneYearAgo[index].timespan).format('MMMM'): moment(item.timespan).format('MMMM Y')}
      }) // new user
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
    // config module for graphic
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
       
       // save selection user in storage
       this.storageRepository.set('userSelection', JSON.stringify(listFinal));
       this.storageRepository.set('userSelectionOneYearAgo', JSON.stringify(listOfCategoriesOneYearAgo))
       
       this.setGraph(listFinal.map(item => item.volume),listFinal.map(item => item.label), listOfCategoriesOneYearAgo.map(item => item.volume))
  }

  

}
