import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EstudianteFormularioComponent} from './estudiante-formulario.component';
import {MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatNativeDateModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {TableModule} from 'primeng';


@NgModule({
  declarations: [
    EstudianteFormularioComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  exports: [
    EstudianteFormularioComponent
  ]
})
export class EstudianteFormularioModule {
}
