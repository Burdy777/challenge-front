import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TreeModule} from 'primeng/tree';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {ChartModule} from 'primeng/chart';
import {CalendarModule} from 'primeng/calendar';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message'

const MODULE = [
  TreeModule,
  InputTextModule,
  PasswordModule,
  ChartModule,
  CalendarModule,
  MessageModule,
  MessagesModule
]
@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...MODULE
  ],
  exports: [...MODULE]
})
export class PrimeNgModule { }
