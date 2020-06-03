import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EstudiantePorTallerFormularioComponent} from './estudiante-por-taller-formulario.component';
import {MatDialogModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AutoCompleteModule, TableModule} from 'primeng';


@NgModule({
  declarations: [
    EstudiantePorTallerFormularioComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    MatDialogModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    FormsModule,
  ],
  exports: [
    EstudiantePorTallerFormularioComponent
  ]
})
export class EstudiantePorTallerFormularioModule {
}
