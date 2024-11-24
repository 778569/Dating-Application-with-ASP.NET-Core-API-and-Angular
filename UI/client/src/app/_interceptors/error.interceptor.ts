// import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { NavigationExtras, Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
// import { catchError, Observable } from 'rxjs';

// export const errorInterceptor: HttpInterceptorFn = (req, next) => {

//   return next(req);
// };

// @Injectable()

// export class ErrorInterceptor implements HttpInterceptor{

//   constructor(private router: Router, private toastr : ToastrService) { }

//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     return next.handle(request).pipe(
//       catchError((error: HttpErrorResponse)=>{
//         if(error){
//           switch(error.status){
//             case 400:
//               if(error.error.errors){
//                 const modelStateErrors=[];
//                 for(const key in error.error.errors){
//                   if(error.error.errors[key]){
//                     modelStateErrors.push(error.error.errors[key])
//                   }
//                 }
//                 throw modelStateErrors;
//               }else{
//                 this.toastr.error(error.error, error.status.toString())
//               }
//             case 401:
//               this.toastr.error('Unauthorised',error.status.toString())
//               break;
//             case 404:
//               this.router.navigateByUrl('/not-found');
//               break;
//             case 500:
//               const navigationExtras : NavigationExtras ={state :{error:error.error}};
//               this.router.navigateByUrl('/server-error', navigationExtras)
//               break;
//             default:
//               this.toastr.error('Something unexpected went wrong')
//               console.log(error)
//               break;
//           }

//         }
//         throw error;
//       })

      

//     )
//   }
  
 
  
// }

// export class ErrorInterceptor implements HttpInterceptor {
//   constructor(private router: Router, private toastr: ToastrService) {}

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     return next.handle(request).pipe(
//       catchError((error: HttpErrorResponse) => {
//         if (error) {
//           switch (error.status) {
//             case 400:
//               if (error.error.errors) {
//                 const modelStateErrors = [];
//                 for (const key in error.error.errors) {
//                   if (error.error.errors[key]) {
//                     modelStateErrors.push(error.error.errors[key]);
//                   }
//                 }
//                 throw modelStateErrors; // Ends execution for case 400
//               } else {
//                 this.toastr.error(error.error, error.status.toString());
//               }
//               break; // Prevent fallthrough

//             case 401:
//               this.toastr.error('Unauthorised', error.status.toString());
//               break;

//             case 404:
//               this.router.navigateByUrl('/not-found');
//               break;

//             case 500:
//               const navigationExtras: NavigationExtras = { state: { error: error.error } };
//               this.router.navigateByUrl('/server-error', navigationExtras);
//               break;

//             default:
//               this.toastr.error('Something unexpected went wrong');
//               console.log(error);
//               break;
//           }
//         }

//         throw error;
//       })
//     );
//   }
// }

import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {

  
  const toastr = inject(ToastrService); // Use Angular's DI system to inject services
const router = inject(Router)

  return next(req).pipe(
    // catchError((error) => {
    //   if (error.status === 0) {
    //     // Network error
    //     toastr.error('Network error occurred', 'Error');
    //   } else {
    //     // HTTP error
    //     toastr.error(`Error ${error.status}: ${error.message}`, 'Server Error');
    //   }
    //   return throwError(() => error);
    // })

    catchError((error: HttpErrorResponse) => {
              if (error) {
                switch (error.status) {
                  case 400:
                    if (error.error?.errors) {
                      const modelStateErrors: string[] = [];
                      for (const key in error.error.errors) {
                        if (error.error.errors[key]) {
                          modelStateErrors.push(error.error.errors[key]);
                        }
                      }
                      modelStateErrors.forEach((err) => toastr.error(err, 'Validation Error'));
                    } else {
                      toastr.error(error.error, error.status.toString());
                    }
                    break;
      
                  case 401:
                    toastr.error('Unauthorised', error.status.toString());
                    break;
      
                  case 404:
                    router.navigateByUrl('/not-found');
                    break;
      
                  case 500:
                    const navigationExtras: NavigationExtras = { state: { error: error.error } };
                    router.navigateByUrl('/server-error', navigationExtras);
                    break;
      
                  default:
                    toastr.error('Something unexpected went wrong');
                    console.error(error);
                    break;
                }
              }
      
              return throwError(() => error);
            })
  );
};

// import { Injectable } from '@angular/core';
// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { Router, NavigationExtras } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';

// @Injectable()
// export class ErrorInterceptor implements HttpInterceptor {
//   constructor(private router: Router, private toastr: ToastrService) {}

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     return next.handle(request).pipe(
//       catchError((error: HttpErrorResponse) => {
//         if (error) {
//           switch (error.status) {
//             case 400:
//               if (error.error?.errors) {
//                 const modelStateErrors: string[] = [];
//                 for (const key in error.error.errors) {
//                   if (error.error.errors[key]) {
//                     modelStateErrors.push(error.error.errors[key]);
//                   }
//                 }
//                 modelStateErrors.forEach((err) => this.toastr.error(err, 'Validation Error'));
//               } else {
//                 this.toastr.error(error.error, error.status.toString());
//               }
//               break;

//             case 401:
//               this.toastr.error('Unauthorised', error.status.toString());
//               break;

//             case 404:
//               this.router.navigateByUrl('/not-found');
//               break;

//             case 500:
//               const navigationExtras: NavigationExtras = { state: { error: error.error } };
//               this.router.navigateByUrl('/server-error', navigationExtras);
//               break;

//             default:
//               this.toastr.error('Something unexpected went wrong');
//               console.error(error);
//               break;
//           }
//         }

//         return throwError(() => error);
//       })
//     );
//   }
// }
