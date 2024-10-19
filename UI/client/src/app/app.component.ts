import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'client';
 users : any
  
  constructor(private httpClient: HttpClient) {
    
    
  }
  ngOnInit(): void {
   this.httpClient.get('https://localhost:7237/api/Users').subscribe({
    next : request =>this.users = request,
    error: error=> console.log(error),
    
    complete:()=> console.log("Request has completed")
   })
  }



}
