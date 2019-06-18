import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopCategoryComponent } from './component/top-category/top-category.component';
import { CategoriesComponent } from './component/categories/categories.component';

const routes: Routes = [
  {path:'', redirectTo:'top-category', pathMatch:'full'},
  {path: 'top-category', component: TopCategoryComponent},
  {path: 'categories', component:CategoriesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
