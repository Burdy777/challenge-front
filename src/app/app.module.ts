import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StatService } from './service/stats.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopCategoryComponent } from './component/top-category/top-category.component';
import { CategoriesComponent } from './component/categories/categories.component';
import { GraphComponent } from './component/graph/graph.component';
import { AuthentInterceptor } from './service/authentication-interceptor/authent-interceptor.service';
import { LoginComponent } from './component/login/login.component';
import { AuthService } from './service/auth.service';

import { Storage } from './service/storage.service';
import { PrimeNgModule } from './prime-ng/prime-ng.module';




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
    // Ngmodule for primeNg is separate
    PrimeNgModule,
    BrowserAnimationsModule
  ],
  providers: [
    StatService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthentInterceptor, multi: true },
      AuthService,
      Storage
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
