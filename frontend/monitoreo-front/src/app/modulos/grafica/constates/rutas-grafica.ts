import {Routes} from '@angular/router';

export const RUTA_GRAFICA: Routes = [
  {
    path: ':idTaller/grafica-modulo',
    loadChildren: () =>
        import(
          './../grafica.module'
          )
          .then(
            mod => mod.GraficaModule
          ),
    data: {
      breadcrumb: 'Monitoreo'
    }
  }
];
