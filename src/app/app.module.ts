import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StatService } from './service/stats.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {ChartModule} from 'primeng/chart';
import {CalendarModule} from 'primeng/calendar';
import {TreeModule} from 'primeng/tree';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopCategoryComponent } from './component/top-category/top-category.component';
import { CategoriesComponent } from './component/categories/categories.component';
import { GraphComponent } from './component/graph/graph.component';
import { AuthentInterceptor } from './service/authentication-interceptor/authent-interceptor.service';
import { LoginComponent } from './component/login/login.component';
import { AuthService } from './service/auth.service';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';





@NgModule({
  declarations: [
    AppComponent,
    TopCategoryComponent,
    CategoriesComponent,
    GraphComponent,
    LoginComponent
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
    InputTextModule,
    PasswordModule,
    BrowserAnimationsModule
  ],
  providers: [StatService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthentInterceptor, multi: true },
      AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
