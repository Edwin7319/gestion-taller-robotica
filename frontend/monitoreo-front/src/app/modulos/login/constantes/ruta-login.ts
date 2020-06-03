import {Routes} from '@angular/router';

export const RUTA_LOGIN: Routes = [
  {
    path: 'login-modulo',
    loadChildren: () =>
      import(
        './../login.module'
        ).then(
        mod => mod.LoginModule
      )
  }
];
