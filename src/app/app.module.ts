import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StatService } from './service/stats.service';
import { HttpClientModule } from '@angular/common/http';

import {ChartModule} from 'primeng/chart';
import {CalendarModule} from 'primeng/calendar';
import {TreeModule} from 'primeng/tree';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopCategoryComponent } from './component/top-category/top-category.component';
import { CategoriesComponent } from './component/categories/categories.component';
import { GraphComponent } from './component/graph/graph.component';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {MenuItem} from 'primeng/api';



@NgModule({
  declarations: [
    AppComponent,
    TopCategoryComponent,
    CategoriesComponent,
    GraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    TreeModule,
    BrowserAnimationsModule
  ],
  providers: [StatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
