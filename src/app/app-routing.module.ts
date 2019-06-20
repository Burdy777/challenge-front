import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopCategoryComponent } from './component/top-category/top-category.component';
import { CategoriesComponent } from './component/categories/categories.component';
import { LoginComponent } from './component/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path: 'top-category', component: TopCategoryComponent, canActivate: [AuthGuard]},
  {path: 'categories', component:CategoriesComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
