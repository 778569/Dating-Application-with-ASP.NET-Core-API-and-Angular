import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'
import { AccountService } from '../_services/account.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, BsDropdownModule, RouterModule ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {

  model :any ={}
loggedIn = false;
constructor(private accountService : AccountService ) {
 
}
  ngOnInit(): void {
    this.getCurrentUser()
  }




getCurrentUser(){
  this.accountService.currentuser$.subscribe({
    next : user => this.loggedIn = !!user,
    error : error => console.log(error)
    
    
  })
}

login(){
  console.log(this.model)

  this.accountService.login(this.model).subscribe({
    next: response =>{
      console.log(response);
      this.loggedIn= true;
    },
    error: error => console.log(error)
    
  })
}

logout(){
  // this.loggedIn= false;
  this.accountService.logout();
}
}
