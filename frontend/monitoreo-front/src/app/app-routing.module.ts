import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RUTA_RECONOCIMIENTO_FACIAL} from './modulos/reconocimiento-facial/constantes/ruta-reconocimiento-facial';
import {RUTAS_INICIO} from './modulos/inicio/constantes/ruta-inicio';
import {RUTA_LOGIN} from './modulos/login/constantes/ruta-login';
import {RutaNoEncontradaComponent} from './componentes/ruta-no-encontrada/ruta-no-encontrada.component';


const routes: Routes = [
  ...RUTA_RECONOCIMIENTO_FACIAL,
  ...RUTAS_INICIO,
  ...RUTA_LOGIN,
  {
    path: '',
    redirectTo: 'login-modulo',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: RutaNoEncontradaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
