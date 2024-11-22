import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-test-error',
  standalone: false,
  templateUrl: './test-error.component.html',
  styleUrl: './test-error.component.css'
})
export class TestErrorComponent {
  
  constructor(private  http: HttpClient) {
    
    
  }
 baseurl = 'https://localhost:7237/api/'

get404Error(){
  this.http.get(this.baseurl+'buggy/not-found').subscribe({
    next : response => console.log(response),
    error: error=> console.log(error)
    
  })
}

get400Error(){
  this.http.get(this.baseurl+'buggy/bad-request').subscribe({
    next : response => console.log(response),
    error: error=> console.log(error)
    
  })
}
get500Error(){
  this.http.get(this.baseurl+'buggy/server-error').subscribe({
    next : response => console.log(response),
    error: error=> console.log(error)
    
  })
}
get401Error(){
  this.http.get(this.baseurl+'buggy/auth').subscribe({
    next : response => console.log(response),
    error: error=> console.log(error)
    
  })
}
get400ValidationError(){
  this.http.get(this.baseurl+'account/register').subscribe({
    next : response => console.log(response),
    error: error=> console.log(error)
    
  })
}
}
