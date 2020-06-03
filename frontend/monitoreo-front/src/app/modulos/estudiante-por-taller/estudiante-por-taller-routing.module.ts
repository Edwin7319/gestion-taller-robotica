import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RutaGestionEstudiantePorTallerComponent} from './rutas/ruta-gestion-estudiante-por-taller/ruta-gestion-estudiante-por-taller.component';
import {RUTA_IMAGEN_POR_ESTUDIANTE} from '../imagen-por-estudiante/constantes/ruta-imagenn-por-estudiante';


const routes: Routes = [
  ...RUTA_IMAGEN_POR_ESTUDIANTE,
  {
    path: 'gestion-estudiante-por-taller',
    component: RutaGestionEstudiantePorTallerComponent
  },
  {
    path: '',
    redirectTo: 'gestion-estudiante-por-taller',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstudiantePorTallerRoutingModule {
}
