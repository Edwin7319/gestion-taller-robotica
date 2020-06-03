import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RutaIdentificacionFacialComponent} from './ruta/ruta-identificacion-facial/ruta-identificacion-facial.component';


const routes: Routes = [
  {
    path: 'gestion-identificacion-facial',
    component: RutaIdentificacionFacialComponent
  },
  {
    path: '',
    redirectTo: 'gestion-identificacion-facial',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdentificacionFacialRoutingModule {
}
