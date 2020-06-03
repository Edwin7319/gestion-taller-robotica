import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RutaGestionEstudianteComponent} from './rutas/ruta-gestion-estudiante/ruta-gestion-estudiante.component';


const routes: Routes = [
  {
    path: 'gestion-estudiante',
    component: RutaGestionEstudianteComponent
  },
  {
    path: '',
    redirectTo: 'gestion-estudiante',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstudianteRoutingModule {
}
