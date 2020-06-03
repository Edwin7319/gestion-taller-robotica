import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GraficaRoutingModule} from './grafica-routing.module';
import {RutaGraficaComponent} from './ruta-grafica/ruta-grafica.component';
import {FormularioGraficaComponent} from './componentes/formulario-grafica/formulario-grafica.component';
import {FormsModule} from '@angular/forms';
import {MatExpansionModule, MatFormFieldModule, MatTabsModule} from '@angular/material';
import {ReconocimientoFacialModule} from '../reconocimiento-facial/reconocimiento-facial.module';
import {ChartsModule} from 'ng2-charts';
import {CardModule, DropdownModule} from 'primeng';

@NgModule({
  declarations: [
    RutaGraficaComponent,
    FormularioGraficaComponent
  ],
  imports: [
    CommonModule,
    GraficaRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatExpansionModule,
    ReconocimientoFacialModule,
    ChartsModule,
    MatTabsModule,
    DropdownModule,
    CardModule
  ]
})
export class GraficaModule {
}
