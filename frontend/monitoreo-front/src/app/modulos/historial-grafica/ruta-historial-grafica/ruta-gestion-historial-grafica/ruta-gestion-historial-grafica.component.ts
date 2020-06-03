import {Component, OnInit} from '@angular/core';
import {AtributosCaraRestService} from '../../../grafica/servicios/atributos-cara.rest.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TallerRestService} from '../../../taller/servicios/taller.rest.service';
import {ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-ruta-gestion-historial-grafica',
  templateUrl: './ruta-gestion-historial-grafica.component.html',
  styleUrls: ['./ruta-gestion-historial-grafica.component.scss']
})
export class RutaGestionHistorialGraficaComponent implements OnInit {

  myColors = [
    {
      backgroundColor: 'rgba(103, 58, 183, .1)',
      borderColor: 'rgb(103, 58, 183)',
      pointBackgroundColor: 'rgb(103, 58, 183)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(103, 58, 183, .8)'
    }
  ];

  chartData = [
    {data: [], label: 'Ira'},
    {data: [], label: 'Desprecio'},
    {data: [], label: 'Disgusto'},
    {data: [], label: 'Temor'},
    {data: [], label: 'Felicidad'},
    {data: [], label: 'Neutral'},
    {data: [], label: 'Tristeza'},
    {data: [], label: 'Sorpresa'},
  ];

  chartLabels = [];

  imagenesTaller: any[] = [];

  chartOptions = {
    responsive: true
  };

  filtroValido;
  filtroBusqueda;

  idTaller: number;
  nombreTaller: string;
  busquedaSeleccionada: any;

  constructor(
    private readonly _atributosCaraRestService: AtributosCaraRestService,
    private readonly _activateRoute: ActivatedRoute,
    private readonly _tallerRestService: TallerRestService,
    private readonly _router: Router,
    private readonly _toasterService: ToasterService
  ) {
    this._activateRoute
      .params
      .subscribe(
        (value: { idTaller: string }) => {
          this.idTaller = +value.idTaller;
          this.obtenerNombreDeTaller(+value.idTaller);
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pude recuperar parametro de ruta.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  ngOnInit() {
    this._activateRoute
      .queryParams
      .subscribe(
        (parametros: {
          fechaInicio: string,
          fechaFin: string
          etapa: string
          idTaller: number
        }) => {
          const existenParametros = Object.keys(parametros).length === 0;
          if (!existenParametros) {
            const consulta = {
              fechaInicio: parametros.fechaInicio,
              fechaFin: parametros.fechaFin,
              etapa: parametros.etapa,
              idTaller: +parametros.idTaller
            };
            const fechaInicio = parametros.fechaInicio.split('T', 2);
            const fechaFin = parametros.fechaFin.split('T', 2);
            const busqueda = {
              fechaTaller: fechaInicio[0],
              horaInicio: fechaInicio[1],
              horaFin: fechaFin[1],
              etapa: parametros.etapa
            };
            this.busquedaSeleccionada = busqueda;
            this.buscarEmocionesPorFecha(consulta);
          }
        }
      );
  }

  onChartClick(event) {
    // console.log(event);
  }

  parametrosSeleccionados(parametros) {
    const fecha = parametros.fechaTaller;
    const horaInicio = parametros.horaInicio;
    const horaFin = parametros.horaFin;
    const etapa = parametros.etapa;
    const fechaInicio = `${fecha}T${horaInicio}`;
    const fechaFin = `${fecha}T${horaFin}`;
    const consulta = {
      fechaInicio,
      fechaFin,
      etapa,
      idTaller: this.idTaller
    };
    this.filtroValido = parametros;
    this.filtroBusqueda = consulta;
  }

  buscarEmocionesPorFecha(consulta?: any) {
    const ruta = [
      '/inicio-modulo',
      'taller-modulo',
      this.idTaller,
      'historial-grafica-modulo',
      'gestion-historial-grafica'
    ];

    const datosPorFecha$ = this._atributosCaraRestService;
    let auxiliar$;
    if (consulta) {
      auxiliar$ = datosPorFecha$.obtenerDatosPorFecha(consulta);
    } else {
      this._router.navigate(ruta, {queryParams: this.filtroBusqueda});
      auxiliar$ = datosPorFecha$.obtenerDatosPorFecha(this.filtroBusqueda);
    }

    auxiliar$.subscribe(
      value => {
        this.limpiarGrafica();
        this.obtenerEmociones(value.data);
      }
    );
  }

  obtenerEmociones(atributos: []) {
    const existenAtributos = atributos.length > 0;
    if (existenAtributos) {
      const respuesta = atributos.map(
        (value: any) => {
          const hora = value.createdAt.substr(11, 8);
          return {
            emociones: value.faceAttributes.emotion,
            hora,
          };
        }
      ).forEach(
        value => {
          const jsonEmociones = value.emociones;
          const arregloEmociones = [];
          // tslint:disable-next-line:forin
          for (const i in jsonEmociones) {
            arregloEmociones.push(jsonEmociones[i]);
          }
          this.newDataPoint(arregloEmociones, value.hora);
        }
      );

      const arregloImagenes = atributos.map(
        (value: any) => {
          const hora = value.createdAt.substr(11, 8);
          return {
            hora,
            urls: value.url
          };
        }
      );
      const eliminarDuplicados = this.eliminarDuplicados(arregloImagenes, 'hora');
      this.imagenesTaller = eliminarDuplicados;
    }
  }

  eliminarDuplicados(array, key) {
    const arrayNuevo = [];
    const objetoNuevo = {};

    // tslint:disable-next-line:forin
    for (const i in array) {
      objetoNuevo[array[i][key]] = array[i];
    }

    // tslint:disable-next-line:forin
    for (const i in objetoNuevo) {
      arrayNuevo.push(objetoNuevo[i]);
    }
    return arrayNuevo;
  }


  newDataPoint(arreglo, label) {
    this.chartData.forEach((dataset, index) => {
      this.chartData[index] = Object.assign({}, this.chartData[index], {
        data: [...this.chartData[index].data, arreglo[index]]
      });
    });
    this.chartLabels = [...this.chartLabels, label];
  }

  limpiarGrafica() {
    this.chartData.forEach((dataset, index) => {
      dataset.data = [];
    });
    this.chartLabels = [];
  }

  obtenerNombreDeTaller(idTaller: number) {
    this._tallerRestService
      .obtenerUno(idTaller)
      .subscribe(
        value => {
          this.nombreTaller = value.descripcion;
        },
        error => {
          console.error({
            mensaje: 'Error obtner taller',
            error
          });
        }
      );
  }
}
