import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports:[RegisterComponent, NgIf],
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

users : any

constructor(private httpClient: HttpClient) {
 
  
}
  ngOnInit(): void {
   this.getUsers()
  }
  registerMode = false

  registerToggle(){
    this.registerMode = !this.registerMode
  }

  getUsers(){
    this.httpClient.get('https://localhost:7237/api/Users').subscribe({
      next : request =>this.users = request,
      error: error=> console.log(error),
      
      complete:()=> console.log("Request has completed")
     })
  }

  cancelRegisterMode(event: boolean){
this.registerMode = event
  }
}
