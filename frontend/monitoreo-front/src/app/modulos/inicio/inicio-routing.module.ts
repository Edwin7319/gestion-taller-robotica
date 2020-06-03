import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RutaInicioComponent} from './ruta-inicio/ruta-inicio.component';
import {RUTA_TALLER} from '../taller/constantes/ruta-taller';
import {RUTA_ESTUDIANTE} from '../estudiante/constantes/estudiante-ruta';
import {RUTA_IDENTIFICACION_FACIAL} from '../identificacion-facial/componentes/ruta-identificacion-facial';
import {RUTA_USUARIO} from '../usuario/constantes/ruta-usuario';


const routes: Routes = [
  ...RUTA_TALLER,
  ...RUTA_ESTUDIANTE,
  ...RUTA_IDENTIFICACION_FACIAL,
  ...RUTA_USUARIO,
  {
    path: 'gestion-inicio',
    component: RutaInicioComponent
  },
  {
    path: '',
    redirectTo: 'gestion-inicio',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule {
}
