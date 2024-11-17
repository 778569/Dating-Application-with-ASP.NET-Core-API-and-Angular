import { Component, OnInit, Pipe } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'
import { AccountService } from '../_services/account.service';
import { RouterModule } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../_modules/shared.module';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports:[RouterModule,CommonModule,FormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {

  model :any ={}
loggedIn = false;
constructor(private accountService : AccountService , private toster: ToastrService) {

}
  ngOnInit(): void {
    this.getCurrentUser()
  }




getCurrentUser(){
  this.accountService.currentuser$.subscribe({
    next : user => this.loggedIn = !!user,
    error : error => this.toster.error(error.error)


  })
}

login(){
  console.log(this.model)

  this.accountService.login(this.model).subscribe({
    next: response =>{
      console.log(response);
      this.loggedIn= true;
    },
    // error: error => console.log(error)
    error : error => this.toster.error(error.error)



  })
}

logout(){
  // this.loggedIn= false;
  this.accountService.logout();
}
}
