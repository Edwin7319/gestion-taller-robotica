import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RutaLoginComponent} from './rutas/ruta-login/ruta-login.component';


const routes: Routes = [
  {
    path: 'login',
    component: RutaLoginComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {
}
