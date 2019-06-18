import { Component, OnInit } from '@angular/core';
import { StatService } from 'src/app/service/stats.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
data = [
  {
      "label": "Documents",
      "data": "Documents Folder",
      "expandedIcon": "fa fa-folder-open",
      "collapsedIcon": "fa fa-folder",
      "children": [{
              "label": "Work",
              "data": "Work Folder",
              "expandedIcon": "fa fa-folder-open",
              "collapsedIcon": "fa fa-folder",
              "children": [{"label": "Expenses.doc", "icon": "fa fa-file-word-o", "data": "Expenses Document"}, {"label": "Resume.doc", "icon": "fa fa-file-word-o", "data": "Resume Document"}]
          },
          {
              "label": "Home",

              "expandedIcon": "fa fa-folder-open",
              "collapsedIcon": "fa fa-folder",
              "children": []
          }]
  },
  {
      "label": "Pictures",
      "data": "Pictures Folder",
      "expandedIcon": "fa fa-folder-open",
      "collapsedIcon": "fa fa-folder",
      "children": [
          {"label": "barcelona.jpg", "icon": "fa fa-file-image-o", "data": "Barcelona Photo"},
          {"label": "logo.jpg", "icon": "fa fa-file-image-o", "data": "PrimeFaces Logo"},
          {"label": "primeui.png", "icon": "fa fa-file-image-o", "data": "PrimeUI Logo"}]
  },{
    "label": "Movies",
    "data": "Movies Folder",
    "expandedIcon": "fa fa-folder-open",
    "collapsedIcon": "fa fa-folder",
    "children": [{
            "label": "Al Pacino",
            "data": "Pacino Movies",
            "children": [{"label": "Scarface", "icon": "fa fa-file-video-o", "data": "Scarface Movie"}, {"label": "Serpico", "icon": "fa fa-file-video-o", "data": "Serpico Movie"}]
        },
        {
            "label": "Robert De Niro",
            "data": "De Niro Movies",
            "children": [{"label": "Goodfellas", "icon": "fa fa-file-video-o", "data": "Goodfellas Movie"}, {"label": "Untouchables", "icon": "fa fa-file-video-o", "data": "Untouchables Movie"}]
        }]
}
];
data1 = [];
isSelected = false;
categorySelected
  constructor(private statService: StatService) { }

  ngOnInit() {
    this.statService.getAllCategories().then(categories => {
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
                "collapsedIcon": subChild.children.length > 0 ? "fa fa-folder" : null,
                
                
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
      }
      ]
      this.data1 = allCategorieMap;

    })
  }

  selected(event) {
    this.statService.getCategorie(event.node.id).subscribe(categorySelected => {
      this.isSelected = true;
      this.categorySelected = categorySelected;
    })
  }

}
