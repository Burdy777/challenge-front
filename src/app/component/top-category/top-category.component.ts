import { Component, OnInit, createPlatformFactory } from '@angular/core';
import { StatService } from 'src/app/service/stats.service';
@Component({
  selector: 'app-top-category',
  templateUrl: './top-category.component.html',
  styleUrls: ['./top-category.component.scss']
})
export class TopCategoryComponent implements OnInit {
  topCategorieCurrent;
  constructor(public statService:StatService) {}

  ngOnInit() {
    this.statService.getTopCategorie().subscribe((topCategorie:Array<any>) => {
      this.topCategorieCurrent = topCategorie; 
    })
  }
  


  
}
