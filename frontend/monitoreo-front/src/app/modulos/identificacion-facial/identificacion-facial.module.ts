import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdentificacionFacialRoutingModule } from './identificacion-facial-routing.module';
import { RutaIdentificacionFacialComponent } from './ruta/ruta-identificacion-facial/ruta-identificacion-facial.component';


@NgModule({
  declarations: [RutaIdentificacionFacialComponent],
  imports: [
    CommonModule,
    IdentificacionFacialRoutingModule
  ]
})
export class IdentificacionFacialModule { }
