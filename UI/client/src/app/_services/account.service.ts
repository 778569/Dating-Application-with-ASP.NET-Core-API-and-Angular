import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient) { }
  baseUrl ="https://localhost:7237/api/"

  private CurrentUserSource = new BehaviorSubject<User | null>(null);
  currentuser$ = this.CurrentUserSource.asObservable();

  login(model :any ){
  return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
    map((response : User)=>{
      const user = response
    if(user){
      localStorage.setItem('user',JSON.stringify(user));
      this.CurrentUserSource.next(user)
    }
    
  }))
  }

  setCurrentUser(user: User){
this.CurrentUserSource.next(user)
  }

  logout(){
    localStorage.removeItem('user');
    this.CurrentUserSource.next(null)
    
  }

  registerUser(model:any){

    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map((response:User)=>{
        const user = response
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          this.CurrentUserSource.next(user);
        }
        
      })
    )
  }
}
