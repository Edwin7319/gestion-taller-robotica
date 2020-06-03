import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TallerRoutingModule} from './taller-routing.module';
import {RutaGestionTallerComponent} from './rutas/ruta-gestion-taller/ruta-gestion-taller.component';
import {CrearEditarTallerComponent} from './modales/crear-editar-taller/crear-editar-taller.component';
import {FormsModule} from '@angular/forms';
import {ConfirmDialogModule, MessagesModule, TableModule} from 'primeng';
import {MatDialogModule, MatFormFieldModule} from '@angular/material';
import {ToasterModule} from 'angular2-toaster';
import {TallerFormularioModule} from './componentes/taller-formulario/taller-formulario.module';


@NgModule({
  declarations: [
    CrearEditarTallerComponent,
    RutaGestionTallerComponent
  ],
  imports: [
    CommonModule,
    TallerRoutingModule,
    FormsModule,
    TableModule,
    MatFormFieldModule,
    ToasterModule,
    MatDialogModule,
    TallerFormularioModule,
    ConfirmDialogModule,
    MessagesModule
  ],
  entryComponents: [
    CrearEditarTallerComponent
  ]
})
export class TallerModule {
}
