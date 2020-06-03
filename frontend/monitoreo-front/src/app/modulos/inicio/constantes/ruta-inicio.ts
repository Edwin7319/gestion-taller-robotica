import {Routes} from '@angular/router';

export const RUTAS_INICIO: Routes = [
  {
    path: 'inicio-modulo',
    loadChildren: () =>
      import(
        './../inicio.module'
        ).then(
        mod => mod.InicioModule
      ),
    data: {
      breadcrumb: 'Inicio'
    }
  }
];
