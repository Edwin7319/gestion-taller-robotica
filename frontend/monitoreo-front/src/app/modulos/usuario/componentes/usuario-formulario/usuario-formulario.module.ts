import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsuarioFormularioComponent} from './usuario-formulario.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule, MatSelectModule} from '@angular/material';


@NgModule({
  declarations: [
    UsuarioFormularioComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule
  ],
  exports: [
    UsuarioFormularioComponent
  ]
})
export class UsuarioFormularioModule {
}
