import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {WebsocketGatewayService} from '../servicios/websocket.gateway.service';
import {AtributosCaraRestService} from '../servicios/atributos-cara.rest.service';
import {ImagenRestService} from '../../imagen/servicio/rest/imagen.rest.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-ruta-grafica',
  templateUrl: './ruta-grafica.component.html',
  styleUrls: ['./ruta-grafica.component.scss']
})
export class RutaGraficaComponent implements OnInit, OnDestroy {

  datos: any;
  nombreSala: string;
  nombreSala1: { mensaje: string };
  subscripciones: Subscription[] = [];
  algo;
  idImagen: number;
  urlImagen: string;
  idTaller: number;

  arregloEmocionesAlumno1 = [];
  arregloEmocionesAlumno2 = [];
  arregloEmocionesAlumno3 = [];
  arregloEmocionesAlumno4 = [];

  emocionesAlumno2;
  emocionesAlumno3;
  emocionesAlumno4;

  chartOptions = {
    responsive: true
  };

  myColors = [
    {
      backgroundColor: 'rgba(103, 58, 183, .1)',
      borderColor: 'rgb(103, 58, 183)',
      pointBackgroundColor: 'rgb(103, 58, 183)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(103, 58, 183, .8)'
    },
    // {
    //   backgroundColor: 'rgba(103, 58, 183, .1)',
    //   borderColor: 'rgb(0,0,0)',
    //   pointBackgroundColor: 'rgb(103, 58, 183)',
    //   pointBorderColor: '#fff',
    //   pointHoverBackgroundColor: '#fff',
    //   pointHoverBorderColor: 'rgba(103, 58, 183, .8)'
    // },
    // // ...colors for additional data sets
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

  chartData1 = [
    {data: [], label: 'Ira'},
    {data: [], label: 'Desprecio'},
    {data: [], label: 'Disgusto'},
    {data: [], label: 'Temor'},
    {data: [], label: 'Felicidad'},
    {data: [], label: 'Neutral'},
    {data: [], label: 'Tristeza'},
    {data: [], label: 'Sorpresa'},
  ];

  chartData2 = [
    {data: [], label: 'Ira'},
    {data: [], label: 'Desprecio'},
    {data: [], label: 'Disgusto'},
    {data: [], label: 'Temor'},
    {data: [], label: 'Felicidad'},
    {data: [], label: 'Neutral'},
    {data: [], label: 'Tristeza'},
    {data: [], label: 'Sorpresa'},
  ];

  chartData3 = [
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
  estados = [];
  estadoSeleccionado: any;

  constructor(
    public readonly websocketService: WebsocketGatewayService,
    private readonly _atributosCaraRestService: AtributosCaraRestService,
    private readonly _imagenRestService: ImagenRestService,
    private readonly _activateRoute: ActivatedRoute
  ) {
    // this.obtnerDatosUsuario(DATOS_PRUEBA);
    this.estados = [
      {name: 'Ninguno'},
      {name: 'Explorar'},
      {name: 'Crear'},
      {name: 'Compartir'}
    ];
    this.recuperarParametrosDeRuta();
  }

  ngOnInit() {

    const respuestaConectado = this.websocketService
      .eventoSeConecto
      .subscribe(
        (respuesta) => {
        }
      );
    this.subscripciones.push(respuestaConectado);

    const respuestaRecibido = this.websocketService
      .eventoDatoRecibido
      .subscribe(
        (dato) => {
          this.newDataPoint(dato);
        }
      );
    this.subscripciones.push(respuestaRecibido);

    if (!this.websocketService.conectado) {

    }
  }

  recuperarParametrosDeRuta() {
    this._activateRoute
      .params
      .subscribe(
        (value: { idTaller: string }) => {
          this.idTaller = +value.idTaller;
        },
        error => {
          console.error(
            {
              mensaje: 'No se recupero parametros de ruta'
            }
          );
        }
      );
  }

  async unirmeASalaMonitoreo() {
    const respuesta = await this.websocketService.unirseAMonitoreo(this.nombreSala);
    this.nombreSala1 = respuesta;
  }

  async dejarSala() {
    const res = await this.websocketService.dejarMonitoreo(this.nombreSala);
    this.nombreSala = '';
    this.nombreSala1 = res;
  }

  ngOnDestroy() {
    this.subscripciones.forEach(
      value => {
        value.unsubscribe();
      }
    );
  }

  guardarEnMongoDB(datos: any) {
    this._atributosCaraRestService
      .insertarAtributosEnMongo(datos)
      .subscribe(
        value => {
          console.log('Guardado ', value);
        },
        error => {
          console.error({
            mensaje: 'No se guardo'
          });
        }
      );
  }

  recuperarLinkImagen(evento) {
    const urlImagen = {
      url: evento.toString()
    };
    this._imagenRestService
      .guardar(urlImagen)
      .subscribe(
        (value: { data: { url: string }, id: number }) => {
          this.idImagen = +value.id;
          this.urlImagen = value.data.url;
        },
        error => {
          console.error({
            mensaje: 'No se guardo imagen'
          });
        }
      );
  }

  obtnerDatosUsuario(datosRecibidos: any) {
    this.algo = datosRecibidos;
    datosRecibidos.forEach(
      (valor) => {
        valor['idImagen'] = this.idImagen;
        valor['url'] = this.urlImagen;
        valor['idTaller'] = this.idTaller;
        valor['etapa'] = this.estadoSeleccionado.name;
        this.guardarEnMongoDB(valor);
      }
    );
    this.arregloEmocionesAlumno1 = [];
    this.arregloEmocionesAlumno2 = [];
    this.arregloEmocionesAlumno3 = [];
    this.arregloEmocionesAlumno4 = [];

    if (datosRecibidos[0]) {
      const jsonEmocionesAlumno1 = datosRecibidos[0].faceAttributes.emotion;
      // tslint:disable-next-line:forin
      for (const i in jsonEmocionesAlumno1) {
        this.arregloEmocionesAlumno1.push(jsonEmocionesAlumno1[i]);
      }
    }

    if (datosRecibidos[1]) {
      const jsonEmocionesAlumno2 = datosRecibidos[1].faceAttributes.emotion;
      this.emocionesAlumno2 = jsonEmocionesAlumno2;
      // tslint:disable-next-line:forin
      for (const i in jsonEmocionesAlumno2) {
        this.arregloEmocionesAlumno2.push(jsonEmocionesAlumno2[i]);
      }
    }

    if (datosRecibidos[2]) {
      const jsonEmocionesAlumno3 = datosRecibidos[2].faceAttributes.emotion;
      this.emocionesAlumno3 = jsonEmocionesAlumno3;
      // tslint:disable-next-line:forin
      for (const i in jsonEmocionesAlumno3) {
        this.arregloEmocionesAlumno3.push(jsonEmocionesAlumno3[i]);
      }
    }


    if (datosRecibidos[3]) {
      const jsonEmocionesAlumno4 = datosRecibidos[3].faceAttributes.emotion;
      this.emocionesAlumno4 = jsonEmocionesAlumno4;
      // tslint:disable-next-line:forin
      for (const i in jsonEmocionesAlumno4) {
        this.arregloEmocionesAlumno4.push(jsonEmocionesAlumno4[i]);
      }
    }

    const horaActual = new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();

    const datosAEmitir: any = {
      data: {
        arregloEmocionesAlumno1: this.arregloEmocionesAlumno1,
        arregloEmocionesAlumno2: this.arregloEmocionesAlumno2,
        arregloEmocionesAlumno3: this.arregloEmocionesAlumno3,
        arregloEmocionesAlumno4: this.arregloEmocionesAlumno4,
      },
      label: horaActual.toString()
    };


    this.newDataPoint(datosAEmitir);
    this.websocketService.enviarDato(this.nombreSala, datosAEmitir);
  }


  onChartClick(event) {
    console.log(event);
  }

  newDataPoint(datos: {
    data: {
      arregloEmocionesAlumno1: [],
      arregloEmocionesAlumno2: [],
      arregloEmocionesAlumno3: [],
      arregloEmocionesAlumno4: [],
    }, label: string
  }) { ///

    const dataArr = datos.data.arregloEmocionesAlumno1;
    const dataArr1 = datos.data.arregloEmocionesAlumno2;
    const dataArr2 = datos.data.arregloEmocionesAlumno3;
    const dataArr3 = datos.data.arregloEmocionesAlumno4;


    const label = datos.label;

    this.chartData.forEach((dataset, index) => {
      if (dataset.data.length > 10) {
        dataset.data.shift();
      }
      this.chartData[index] = Object.assign({}, this.chartData[index], {
        data: [...this.chartData[index].data, dataArr[index]]
      });
    });


    this.chartData1.forEach((dataset, index) => {
      if (dataset.data.length > 10) {
        dataset.data.shift();
      }
      this.chartData1[index] = Object.assign({}, this.chartData1[index], {
        data: [...this.chartData1[index].data, dataArr1[index]]
      });
    });

    this.chartData2.forEach((dataset, index) => {
      if (dataset.data.length > 10) {
        dataset.data.shift();
      }
      this.chartData2[index] = Object.assign({}, this.chartData2[index], {
        data: [...this.chartData2[index].data, dataArr2[index]]
      });
    });

    this.chartData3.forEach((dataset, index) => {
      if (dataset.data.length > 10) {
        dataset.data.shift();
      }
      this.chartData3[index] = Object.assign({}, this.chartData3[index], {
        data: [...this.chartData3[index].data, dataArr3[index]]
      });
    });


    if (this.chartLabels.length > 10) {
      this.chartLabels.shift();
    }

    this.chartLabels = [...this.chartLabels, label];
  }
}
