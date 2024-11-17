import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import { HomeComponent } from "./home/home.component";
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: false,
  
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'client';

  
  constructor(private accountServive : AccountService) {
    
    
  }
  ngOnInit(): void {

  this.setCurrentUser();
  }

 


  setCurrentUser(){
    const UserString =localStorage.getItem('user');
    if(!UserString) return;
    const user : User = JSON.parse(UserString);
    this.accountServive.setCurrentUser(user)
  }


}
 