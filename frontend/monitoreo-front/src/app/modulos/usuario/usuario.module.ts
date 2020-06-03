import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsuarioRoutingModule} from './usuario-routing.module';
import {RutaGestionUsuarioComponent} from './rutas/ruta-gestion-usuario/ruta-gestion-usuario.component';
import {TableModule} from 'primeng';
import {FormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material';
import {CrearEditarUsuarioComponent} from './modales/crear-editar-usuario/crear-editar-usuario.component';
import {UsuarioFormularioModule} from './componentes/usuario-formulario/usuario-formulario.module';


@NgModule({
  declarations: [
    RutaGestionUsuarioComponent,
    CrearEditarUsuarioComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    TableModule,
    FormsModule,
    MatDialogModule,
    UsuarioFormularioModule
  ],
  entryComponents: [
    CrearEditarUsuarioComponent
  ]
})
export class UsuarioModule {
}
