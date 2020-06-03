import {Routes} from '@angular/router';
import {RolServiceGuard} from '../../../guard/rol-guard-service.guard';

export const RUTA_USUARIO: Routes = [
  {
    path: 'usuario-modulo',
    loadChildren: () =>
      import(
        './../usuario.module'
        ).then(
        mod => mod.UsuarioModule
      ),
    canActivate: [RolServiceGuard],
    data: {
      breadcrumb: 'Gestion usuarios',
      expectedRoles: ['administrador']
    }
  }
];
