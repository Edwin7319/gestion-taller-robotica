import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FiltroBusquedaFechaComponent} from './filtro-busqueda-fecha.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DropdownModule} from 'primeng';


@NgModule({
  declarations: [
    FiltroBusquedaFechaComponent
  ],
  exports: [
    FiltroBusquedaFechaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    FormsModule
  ]
})
export class FiltroBusquedaFechaModule {
}
