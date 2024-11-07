import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, NgFor, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'client';
 users : any
  
  constructor(private httpClient: HttpClient, private accountServive : AccountService) {
    
    
  }
  ngOnInit(): void {
  this.getUsers();
  this.setCurrentUser();
  }

  getUsers(){
    this.httpClient.get('https://localhost:7237/api/Users').subscribe({
      next : request =>this.users = request,
      error: error=> console.log(error),
      
      complete:()=> console.log("Request has completed")
     })
  }


  setCurrentUser(){
    const UserString =localStorage.getItem('user');
    if(!UserString) return;
    const user : User = JSON.parse(UserString);
    this.accountServive.setCurrentUser(user)
  }


}
