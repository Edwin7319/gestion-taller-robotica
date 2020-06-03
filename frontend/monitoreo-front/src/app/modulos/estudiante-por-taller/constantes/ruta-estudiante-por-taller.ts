import {Routes} from '@angular/router';

export const RUTA_ESTUDIANTE_POR_TALLER: Routes = [
  {
    path: ':idTaller/estudiante-por-taller-modulo',
    loadChildren: () =>
      import(
        './../estudiante-por-taller.module'
        ).then(
        mod => mod.EstudiantePorTallerModule
      ),
    data: {
      breadcrumb: 'Estudiante por taller'
    }
  }
];
