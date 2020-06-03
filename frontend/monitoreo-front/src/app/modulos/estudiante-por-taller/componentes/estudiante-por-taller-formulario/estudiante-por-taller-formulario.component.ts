import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import {TallerRestService} from '../../../taller/servicios/taller.rest.service';
import {EstudianteInterface} from '../../../estudiante/interfaces/estudiante.interface';
import {EstudianteRestService} from '../../../estudiante/servicio/estudiante.rest.service';
import {RespuestaInterface} from '../../../../interfaces/respuesta.interface';

@Component({
  selector: 'app-estudiante-por-taller-formulario',
  templateUrl: './estudiante-por-taller-formulario.component.html',
  styleUrls: ['./estudiante-por-taller-formulario.component.scss']
})
export class EstudiantePorTallerFormularioComponent implements OnInit {

  @Output() datosEstudiantePorTaller: EventEmitter<object | boolean> = new EventEmitter<object | boolean>();

  estudiantes: any;
  estudianteSeleccionado: EstudianteInterface[];
  registrosTotales: number;
  columnas: any[] = [
    {field: 'nombre', header: 'Nombre'},
    {field: 'apellido', header: 'Apellido'},
  ];

  constructor(
    private readonly _toasterService: ToasterService,
    private readonly _tallerRestService: TallerRestService,
    private readonly _estudianteRestService: EstudianteRestService
  ) {
    this.buscarEstudiantes();
  }

  ngOnInit() {
  }

  buscarEstudiantes() {
    this._estudianteRestService.listarEstudiantesDisponibles(0, 5)
      .subscribe(
        (value: RespuestaInterface) => {
          this.estudiantes = value.data;
          this.registrosTotales = value.cantidad;
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo cargar datos.',
            timeout: 1500,
            showCloseButton: true
          });

        }
      );
  }

  cargarMasDatos(evento: any) {
    this._estudianteRestService
      .listarEstudiantesDisponibles(evento.first, 5)
      .subscribe(
        (respuesta: RespuestaInterface) => {
          this.estudiantes = respuesta.data;
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo cargar datos.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }
}
