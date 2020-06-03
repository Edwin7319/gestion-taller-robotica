import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EstudianteRoutingModule} from './estudiante-routing.module';
import {RutaGestionEstudianteComponent} from './rutas/ruta-gestion-estudiante/ruta-gestion-estudiante.component';
import {CrearEditarEstudianteComponent} from './modales/crear-editar-estudiante/crear-editar-estudiante.component';
import {TableModule} from 'primeng';
import {FormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material';
import {EstudianteFormularioModule} from './componentes/estudiante-formulario/estudiante-formulario.module';


@NgModule({
  declarations: [
    RutaGestionEstudianteComponent,
    CrearEditarEstudianteComponent
  ],
  imports: [
    CommonModule,
    EstudianteRoutingModule,
    TableModule,
    FormsModule,
    MatDialogModule,
    EstudianteFormularioModule
  ],
  entryComponents: [
    CrearEditarEstudianteComponent
  ]
})
export class EstudianteModule {
}
