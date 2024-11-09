import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,NgFor],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  @Output() cancelRegister = new EventEmitter()
  // @Input() usersFromHomeComponent : any

   constructor(private accountService: AccountService) {
    
  }
  ngOnInit(): void {
   
  }

  model : any = {}

  register(){
    // console.log(this.model)
    this.accountService.registerUser(this.model).subscribe({
      next : response =>{
        // console.log(response)
        this.cancel()
      },
      error: error=> console.error(error)
      
    })

  }

  cancel(){
    // console.log('cancelled')
    this.cancelRegister.emit(false)
  }
}