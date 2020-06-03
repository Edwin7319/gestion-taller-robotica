import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TallerFormularioComponent} from './taller-formulario.component';
import {MatDialogModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {TableModule} from 'primeng';


@NgModule({
  declarations: [
    TallerFormularioComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  exports: [
    TallerFormularioComponent
  ]
})
export class TallerFormularioModule {
}
