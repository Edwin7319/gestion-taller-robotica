import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistorialGraficaRoutingModule } from './historial-grafica-routing.module';
import { RutaGestionHistorialGraficaComponent } from './ruta-historial-grafica/ruta-gestion-historial-grafica/ruta-gestion-historial-grafica.component';
import {ChartsModule} from 'ng2-charts';
import {ReactiveFormsModule} from '@angular/forms';
import {FiltroBusquedaFechaModule} from './componentes/filtro-busqueda-fecha/filtro-busqueda-fecha.module';


@NgModule({
  declarations: [RutaGestionHistorialGraficaComponent],
  imports: [
    CommonModule,
    HistorialGraficaRoutingModule,
    ChartsModule,
    ReactiveFormsModule,
    FiltroBusquedaFechaModule
  ]
})
export class HistorialGraficaModule { }
