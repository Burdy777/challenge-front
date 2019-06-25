import { Component, OnInit, Inject } from '@angular/core';
import { StatService } from 'src/app/domain/service/stats.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
data = [];
isSelected = false;
categorySelected
  constructor(@Inject('StatService') private statService: StatService) { }

  ngOnInit() {
    this.statService.getAllCategories().subscribe(categories =>this.buildTree(categories))
  }


  // config to create the tree of category
  buildTree(categories) {    
    const treeChildren = categories['children'].map(c => {
      return {
        "id":c.id,
        "label": c.name,
        "expandedIcon": this.hasChildren(c) ? "fa fa-folder-open" : null,
        "collapsedIcon": this.hasChildren(c) ? "fa fa-folder" : null,
        "children" : this.hasChildren(c) ? c.children.map(cc => this.setCurrentChild(cc)) : [] 
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
}
  
// function recursive, set config for all children no matter how much there are
setCurrentChild(c) {
  return {
    "id":c.id,
    "label": c.name,
    "expandedIcon": c.children.length > 0 ? "fa fa-folder-open" : null,
    "collapsedIcon": c.children.length > 0 ? "fa fa-folder" : null,
    "children" : this.hasChildren(c) ? c.children.map(cc => this.setCurrentChild(cc)) : [] 
  }
}

hasChildren(c) {
return c.children.length > 0
}

  selected(event) {
    this.statService.getCategorie(event.node.id).subscribe(categorySelected => {
      this.isSelected = true;
      this.categorySelected = categorySelected;
    })
  }

}

