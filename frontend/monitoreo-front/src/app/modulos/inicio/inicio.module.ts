import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { RutaInicioComponent } from './ruta-inicio/ruta-inicio.component';


@NgModule({
  declarations: [RutaInicioComponent],
  imports: [
    CommonModule,
    InicioRoutingModule
  ]
})
export class InicioModule { }
