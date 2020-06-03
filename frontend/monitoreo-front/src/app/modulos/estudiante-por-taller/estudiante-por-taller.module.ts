import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EstudiantePorTallerRoutingModule} from './estudiante-por-taller-routing.module';
import {RutaGestionEstudiantePorTallerComponent} from './rutas/ruta-gestion-estudiante-por-taller/ruta-gestion-estudiante-por-taller.component';
import {CrearEditarEstudiantePorTallerComponent} from './modales/crear-editar-estudiante-por-taller/crear-editar-estudiante-por-taller.component';
import {EstudiantePorTallerFormularioModule} from './componentes/estudiante-por-taller-formulario/estudiante-por-taller-formulario.module';
import {FormsModule} from '@angular/forms';
import {TableModule} from 'primeng';
import {MatDialogModule} from '@angular/material';


@NgModule({
  declarations: [
    RutaGestionEstudiantePorTallerComponent,
    CrearEditarEstudiantePorTallerComponent
  ],
    imports: [
        CommonModule,
        EstudiantePorTallerRoutingModule,
        EstudiantePorTallerFormularioModule,
        FormsModule,
        TableModule,
        MatDialogModule
    ],
  entryComponents: [
    CrearEditarEstudiantePorTallerComponent
  ]
})
export class EstudiantePorTallerModule {
}
