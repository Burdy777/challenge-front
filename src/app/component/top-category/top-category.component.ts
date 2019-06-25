import { Component, OnInit, createPlatformFactory, Inject } from '@angular/core';
import { StatService } from 'src/app/domain/service/stats.service';
@Component({
  selector: 'app-top-category',
  templateUrl: './top-category.component.html',
  styleUrls: ['./top-category.component.scss']
})
export class TopCategoryComponent implements OnInit {
  topCategorieCurrent;
  constructor(@Inject('StatService') public statService:StatService) {}

  ngOnInit() {
    this.statService.getTopCategorie().subscribe((topCategorie:Array<any>) => {
      this.topCategorieCurrent = topCategorie; 
    })
  }
  


  
}
