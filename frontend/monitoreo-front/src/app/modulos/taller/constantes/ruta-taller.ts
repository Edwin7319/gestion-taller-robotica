import {Routes} from '@angular/router';
import {RolServiceGuard} from '../../../guard/rol-guard-service.guard';

export const RUTA_TALLER: Routes = [
  {
    path: 'taller-modulo',
    loadChildren: () =>
      import(
        './../taller.module'
        ).then(
        mod => mod.TallerModule
      ),
    canActivate: [RolServiceGuard],
    data: {
      breadcrumb: 'Taller',
      expectedRoles: ['administrador', 'profesor']
    }
  }
];
