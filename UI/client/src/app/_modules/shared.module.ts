import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NavComponent } from '../nav/nav.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ToastrModule,
    RouterModule
  ],
  exports:[
    BsDropdownModule,  
    ToastrModule
  ]
})
export class SharedModule { }
