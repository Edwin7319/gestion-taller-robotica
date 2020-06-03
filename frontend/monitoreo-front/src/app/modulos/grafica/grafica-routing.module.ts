import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RutaGraficaComponent} from './ruta-grafica/ruta-grafica.component';


const routes: Routes = [
  {
    path: 'gestion-grafica',
    component: RutaGraficaComponent,
  },
  {
    path: '',
    redirectTo: 'gestion-grafica',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GraficaRoutingModule { }
