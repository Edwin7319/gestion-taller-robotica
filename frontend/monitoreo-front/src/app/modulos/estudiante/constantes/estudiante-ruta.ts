import {Routes} from '@angular/router';
import {RolServiceGuard} from '../../../guard/rol-guard-service.guard';

export const RUTA_ESTUDIANTE: Routes = [
  {
    path: 'estudiante-modulo',
    loadChildren: () =>
      import(
        './../estudiante.module'
        ).then(
        mod => mod.EstudianteModule
      ),
    canActivate: [RolServiceGuard],
    data: {
      breadcrumb: 'Estudiante',
      expectedRoles: ['administrador']
    }
  }
];
