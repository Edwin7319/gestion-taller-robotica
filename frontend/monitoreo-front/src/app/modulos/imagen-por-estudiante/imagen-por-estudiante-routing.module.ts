import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RutaGestionImagenPorEstudianteComponent} from './rutas/ruta-gestion-imagen-por-estudiante/ruta-gestion-imagen-por-estudiante.component';


const routes: Routes = [
  {
    path: 'gestion-imagen-por-estudiante',
    component: RutaGestionImagenPorEstudianteComponent
  },
  {
    path: '',
    redirectTo: 'gestion-imagen-por-estudiante',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImagenPorEstudianteRoutingModule { }
