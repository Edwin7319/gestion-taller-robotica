import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ImagenPorEstudianteRoutingModule} from './imagen-por-estudiante-routing.module';
import {RutaGestionImagenPorEstudianteComponent} from './rutas/ruta-gestion-imagen-por-estudiante/ruta-gestion-imagen-por-estudiante.component';
import {CrearEditarImagenPorEstudianteComponent} from './modales/crear-editar-imagen-por-estudiante/crear-editar-imagen-por-estudiante.component';
import {MatDialogModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {TableModule} from 'primeng';
import {ReconocimientoFacialModule} from '../reconocimiento-facial/reconocimiento-facial.module';


@NgModule({
  declarations: [
    RutaGestionImagenPorEstudianteComponent,
    CrearEditarImagenPorEstudianteComponent
  ],
  imports: [
    CommonModule,
    ImagenPorEstudianteRoutingModule,
    TableModule,
    MatDialogModule,
    ReactiveFormsModule,
    ReconocimientoFacialModule,
  ],
  entryComponents: [
    CrearEditarImagenPorEstudianteComponent
  ]
})
export class ImagenPorEstudianteModule {
}
