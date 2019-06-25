import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopCategoryComponent } from './component/top-category/top-category.component';
import { CategoriesComponent } from './component/categories/categories.component';
import { GraphComponent } from './shared/component/graph/graph.component';
import { AuthentInterceptor } from './shared/interceptor/authentication-interceptor/authent-interceptor.service';
import { LoginComponent } from './component/login/login.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { StatService } from './domain/service/stats.service';
import { AuthService } from './domain/service/auth.service';
import { Storage } from './infrastructure/storage/storage.service';
import { EventHttpProxy } from './infrastructure/http-proxy/event-http-proxy';
import { EventRepository } from './infrastructure/contracts/eventRepository';
import { EventStatsProxy } from './infrastructure/http-proxy/event-stat-proxy';
import { StatRepository } from './infrastructure/contracts/statRepository';



export function getEventRepository(http:HttpClient) {
  return new EventHttpProxy(http);
} 

export function getAuthService(eventRepository:EventRepository, storage:Storage){
  return new AuthService(eventRepository,storage);
}

export function getStorageRepository() {
  return new Storage();
}

export function getEventStatRepository(http:HttpClient) {
  return new EventStatsProxy(http);
}

export function getStatService(statRepository:StatRepository) {
  return new StatService(statRepository);
}
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
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    PrimeNgModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthentInterceptor, multi: true },
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide:'EventRepository', useFactory: getEventRepository, deps:[HttpClient]},
    {provide:'AuthService', useFactory: getAuthService, deps:['EventRepository', Storage]},
    {provide:'StorageRepository', useFactory: getStorageRepository, deps:[]},
    {provide:'StatRepository', useFactory: getEventStatRepository, deps:[HttpClient]},
    {provide:'StatService', useFactory: getStatService, deps:['StatRepository']},
    Storage,
    
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
