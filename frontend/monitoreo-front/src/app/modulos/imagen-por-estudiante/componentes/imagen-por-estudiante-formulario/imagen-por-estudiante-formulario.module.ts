import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImagenPorEstudianteFormularioComponent} from './imagen-por-estudiante-formulario.component';
import {MatDialogModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {TableModule} from 'primeng';


@NgModule({
  declarations: [
    ImagenPorEstudianteFormularioComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  exports: [
    ImagenPorEstudianteFormularioComponent
  ]
})
export class ImagenPorEstudianteFormularioModule {
}
