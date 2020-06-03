import {Routes} from '@angular/router';

export const RUTA_IDENTIFICACION_FACIAL: Routes = [
  {
    path: 'identificacion-facial-modulo',
    loadChildren: () =>
      import(
        './../identificacion-facial.module'
        ).then(
        mod => mod.IdentificacionFacialModule
      ),
    data: {
      breadcrumb: 'Identificacion'
    }
  }
];
