import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RutaGestionTallerComponent} from './rutas/ruta-gestion-taller/ruta-gestion-taller.component';
import {RUTA_ESTUDIANTE_POR_TALLER} from '../estudiante-por-taller/constantes/ruta-estudiante-por-taller';
import {RUTA_GRAFICA} from '../grafica/constates/rutas-grafica';
import {RUTA_HISTORIAL_GRAFICA} from '../historial-grafica/constantes/ruta-historial-grafica';


const routes: Routes = [
  ...RUTA_ESTUDIANTE_POR_TALLER,
  ...RUTA_GRAFICA,
  ...RUTA_HISTORIAL_GRAFICA,
  {
    path: 'gestion-taller',
    component: RutaGestionTallerComponent
  },
  {
    path: '',
    redirectTo: 'gestion-taller',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TallerRoutingModule {
}
