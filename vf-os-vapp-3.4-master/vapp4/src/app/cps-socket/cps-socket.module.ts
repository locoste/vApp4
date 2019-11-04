import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CpsSocketService} from "./cps-socket.service";

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    CpsSocketService
  ]
})
export class CpsSocketModule { }
