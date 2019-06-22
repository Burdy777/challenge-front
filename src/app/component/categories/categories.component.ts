import { Component, OnInit } from '@angular/core';
import { StatService } from 'src/app/service/stats.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
data = [];
isSelected = false;
categorySelected
  constructor(private statService: StatService) { }

  ngOnInit() {
    this.statService.getAllCategories().then(categories => {
      // config to create the tree of category
      const treeChildren = categories['children'].map(c => {
          return {
            "id":c.id,
            "label": c.name,
            "expandedIcon": c.children.length > 0 ? "fa fa-folder-open" : null,
            "collapsedIcon": c.children.length > 0 ? "fa fa-folder" : null,
            "children": c.children.length > 0 ? c.children.map((subChild) => {
              return {
                "id":subChild.id,
                "label": subChild.name,
                "expandedIcon": subChild.children.length > 0 ? "fa fa-folder-open" : null,
                "collapsedIcon": subChild.children.length > 0 ? "fa fa-folder" : null
              }
            }) : []
          } 
      })

      const allCategorieMap = [{
        "id": categories['id'],
        "label": categories['name'],
        "expandedIcon":  "fa fa-folder-open",
        "collapsedIcon": "fa fa-folder",
        "children": treeChildren
      }]
      this.data = allCategorieMap;

    })
  }

  selected(event) {
    this.statService.getCategorie(event.node.id).subscribe(categorySelected => {
      this.isSelected = true;
      this.categorySelected = categorySelected;
    })
  }

}
