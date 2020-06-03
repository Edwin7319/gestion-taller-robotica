import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RutaGestionReconocimientoFacialComponent} from './ruta-gestion-reconocimiento-facial/ruta-gestion-reconocimiento-facial.component';


const routes: Routes = [
  {
    path: 'gestion-reconocimiento-facil',
    component: RutaGestionReconocimientoFacialComponent
  },
  {
    path: '',
    redirectTo: 'gestion-reconocimiento-facil',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReconocimientoFacialRoutingModule { }
