import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginRoutingModule} from './login-routing.module';
import {RutaLoginComponent} from './rutas/ruta-login/ruta-login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TextMaskModule} from 'angular2-text-mask';


@NgModule({
  declarations: [RutaLoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    TextMaskModule
  ]
})
export class LoginModule {
}
