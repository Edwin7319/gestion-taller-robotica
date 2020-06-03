import {Routes} from '@angular/router';

export const RUTA_HISTORIAL_GRAFICA: Routes = [
  {
    path: ':idTaller/historial-grafica-modulo',
    loadChildren: () =>
      import(
        '../historial-grafica.module'
        ).then(
        mod => mod.HistorialGraficaModule
      ),
    data: {
      breadcrumb: 'Historial'
    }
  }
];
