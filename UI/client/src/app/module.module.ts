import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { ToastrModule } from 'ngx-toastr';
import { RegisterComponent } from './register/register.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './_modules/shared.module';



@NgModule({
  declarations: [
    NavComponent,
    RegisterComponent,
    ListsComponent,
    MemberDetailComponent,
    MemberListComponent,
    MessagesComponent,
    HomeComponent

  ],
  imports: [
    CommonModule,
    RouterOutlet, 
    HttpClientModule, 
    NgFor, 
    FormsModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers:[],
  bootstrap:[AppComponent]
})
export class ModuleModule { }
