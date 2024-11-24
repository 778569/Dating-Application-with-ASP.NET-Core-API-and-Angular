import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideAnimations} from '@angular/platform-browser/animations'

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { ErrorInterceptor } from './_interceptors/error.interceptor';


export const appConfig: ApplicationConfig = {
  // providers: [provideRouter(routes)
  // ]

  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([ErrorInterceptor])),
    provideHttpClient(),
    provideAnimations(),
    provideToastr({
      timeOut: 3000, // Customize toastr configuration
      positionClass: 'toast-bottom-right', // Position of the toast
      preventDuplicates: true,
    }),
    // {provide: HTTP_INTERCEPTORS, useClass:ErrorInterceptor, multi: true}
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ]
};
