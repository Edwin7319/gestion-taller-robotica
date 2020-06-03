import {Routes} from '@angular/router';

export const RUTA_RECONOCIMIENTO_FACIAL: Routes = [
  {
    path: 'reconocimiento-facial-modulo',
    loadChildren: () =>
      import(
        './../reconocimiento-facial.module'
        ).then(
        mod => mod.ReconocimientoFacialModule
      )
  }
];
