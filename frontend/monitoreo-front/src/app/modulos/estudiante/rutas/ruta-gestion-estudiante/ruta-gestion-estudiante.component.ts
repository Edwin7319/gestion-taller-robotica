import {Component, OnInit} from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {RespuestaInterface} from '../../../../interfaces/respuesta.interface';
import {EstudianteRestService} from '../../servicio/estudiante.rest.service';
import {CrearEditarEstudianteComponent} from '../../modales/crear-editar-estudiante/crear-editar-estudiante.component';
import {EstudianteInterface} from '../../interfaces/estudiante.interface';

@Component({
  selector: 'app-ruta-gestion-estudiante',
  templateUrl: './ruta-gestion-estudiante.component.html',
  styleUrls: ['./ruta-gestion-estudiante.component.scss']
})
export class RutaGestionEstudianteComponent implements OnInit {

  estudiantes: EstudianteInterface [] = [];
  columnas: any [] = [
    {field: 'nombre', header: 'Nombre'},
    {field: 'apellido', header: 'Apellido'},
    {field: 'fechaNacimiento', header: 'Fecha Nacimiento'},
    {field: 'habilitado', header: 'Estado'},
    {field: 'id', header: 'OPERACIONES'},
  ];

  registrosTotales: number;
  buscarPorParametros = false;

  constructor(
    private readonly _toasterService: ToasterService,
    private readonly _actvidatedRoute: ActivatedRoute,
    private readonly _dialog: MatDialog,
    private readonly _router: Router,
    private readonly _estudianteRestService: EstudianteRestService,
  ) {
    this.recuperarParametrosDeRuta();
  }

  ngOnInit() {
  }

  private recuperarParametrosDeRuta() {
    this._actvidatedRoute
      .queryParams
      .subscribe(
        parametro => {
          if (parametro.nombre) {
            this.buscarPorParametros = true;
            this.buscarPorNombre(parametro.nombre);
          } else {
            this.buscarPorParametros = false;
            this.listarEstudiante();
          }
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

  listarEstudiante() {
    this._estudianteRestService.obtnerDatos(0, 5)
      .subscribe(
        (respuesta: RespuestaInterface) => {
          this.estudiantes = respuesta.data;
          this.registrosTotales = respuesta.cantidad;
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo listar hisotias de servicio.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  cargarMasDatos(evento: any) {
    this._estudianteRestService
      .obtnerDatos(evento.first, 5)
      .subscribe(
        (respuesta: RespuestaInterface) => {
          if (!this.buscarPorParametros) {
            this.estudiantes = respuesta.data;
          }
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo listar hisotias de servicio.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  abrirModalAgregar() {
    const modalCrearEstudiante$ = this._dialog.open(
      CrearEditarEstudianteComponent, {
        width: '550px',
        data: false
      }
    );

    modalCrearEstudiante$
      .afterClosed()
      .subscribe(
        (respuesta: EstudianteInterface) => {
          if (respuesta) {
            this.guardarEstudiante(respuesta);
          }
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se abrir modal taller.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );

  }

  guardarEstudiante(estudiante: EstudianteInterface) {
    this._estudianteRestService
      .guardar(estudiante)
      .subscribe(
        value => {
          this._toasterService.pop({
            type: 'success',
            title: 'Correcto',
            body: 'Se guardo estudiante.',
            timeout: 1500,
            showCloseButton: true
          });
          this.listarEstudiante();
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se guardo estudiante.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  abrirModalEditar(estudiante: EstudianteInterface) {
    const modalEditarEstudiante$ = this._dialog.open(
      CrearEditarEstudianteComponent, {
        width: '550px',
        data: estudiante
      }
    );

    modalEditarEstudiante$
      .afterClosed()
      .subscribe(
        (respuesta: EstudianteInterface) => {
          if (respuesta) {
            this.editarEstudiante(estudiante.id, respuesta);
          }
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se abrir modal taller.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  editarEstudiante(idEstudiante: number, dato: EstudianteInterface) {
    this._estudianteRestService
      .actualizarUno(idEstudiante, dato)
      .subscribe(
        value => {
          this._toasterService.pop({
            type: 'success',
            title: 'Correcto',
            body: 'Se guardo estudiante.',
            timeout: 1500,
            showCloseButton: true
          });
          this.listarEstudiante();
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se guardo estudiante.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  cambiarEstado(estudiante: EstudianteInterface) {
    const idEstudiante = estudiante.id;
    const nuevoEstado = (estudiante.habilitado) ? 0 : 1;
    const estudianteActualizada: EstudianteInterface = {
      habilitado: nuevoEstado
    };
    this._estudianteRestService
      .actualizarUno(idEstudiante, estudianteActualizada)
      .subscribe(
        (respuestaActualizacion) => {
          this._toasterService.pop('success', 'Correcto', 'Guardado correctamente');
          estudiante.habilitado = nuevoEstado;
        },
        error => {
          this._toasterService.pop('error', 'Error', 'Error con el servidor.');
        }
      );

  }

  buscarPorNombre(nombreBuscar: string) {
    const ruta = [
      '/inicio-modulo',
      'estudiante-modulo',
      'gestion-estudiante'
    ];
    if (nombreBuscar === '') {
      this._router.navigate(ruta);
      // this.listarEstudiante();
    } else {
      this._router.navigate(ruta, {queryParams: {nombre: nombreBuscar}});
      this._estudianteRestService
        .buscarEstudiantePorNombre(
          nombreBuscar
        ).subscribe(
        value => {
          console.log(value);
          this.estudiantes = value[0];
        },
        error => {
          console.error({
            mensaje: 'Error buscando por nombre',
            error
          });
        }
      );
    }
  }
}
