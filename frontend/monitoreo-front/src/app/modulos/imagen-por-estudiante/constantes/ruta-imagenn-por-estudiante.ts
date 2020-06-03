import {Routes} from '@angular/router';

export const RUTA_IMAGEN_POR_ESTUDIANTE: Routes = [
  {
    path: ':idEstudiante/imagen-por-estudiante-modulo',
    loadChildren: () =>
      import(
        './../imagen-por-estudiante.module'
        ).then(
        mod => mod.ImagenPorEstudianteModule
      ),
    data: {
      breadcrumb: 'Imagen por estudiante'
    }
  }
];
