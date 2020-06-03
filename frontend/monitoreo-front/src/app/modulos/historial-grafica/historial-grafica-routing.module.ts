import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RutaGestionHistorialGraficaComponent} from './ruta-historial-grafica/ruta-gestion-historial-grafica/ruta-gestion-historial-grafica.component';


const routes: Routes = [
  {
    path: 'gestion-historial-grafica',
    component: RutaGestionHistorialGraficaComponent
  },
  {
    path: '',
    redirectTo: 'gestion-historial-grafica',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistorialGraficaRoutingModule {
}
