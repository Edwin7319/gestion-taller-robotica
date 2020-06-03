import {Component, OnInit} from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {EstudianteInterface} from '../../../estudiante/interfaces/estudiante.interface';
import {EstudiantePorTallerRestService} from '../../servicios/estudiante-por-taller.rest.service';
import {RespuestaInterface} from '../../../../interfaces/respuesta.interface';
import {CrearEditarEstudiantePorTallerComponent} from '../../modales/crear-editar-estudiante-por-taller/crear-editar-estudiante-por-taller.component';
import {EstudiantePorTallerInterface} from '../../interfaces/estudiante-por-taller.interface';

@Component({
  selector: 'app-ruta-gestion-estudiante-por-taller',
  templateUrl: './ruta-gestion-estudiante-por-taller.component.html',
  styleUrls: ['./ruta-gestion-estudiante-por-taller.component.scss']
})
export class RutaGestionEstudiantePorTallerComponent implements OnInit {

  estudiantes: EstudianteInterface [] = [];
  columnas: any [] = [
    {field: 'estudiante', header: 'Nombre'},
    {field: 'estudiante', header: 'Apellido'},
    {field: 'estudiante', header: 'Estado'},
    {field: 'id', header: 'OPERACIONES'},
  ];

  idTaller: number;
  registrosTotales: number;
  idEstudiante: number;

  constructor(
    private readonly _toasterService: ToasterService,
    private readonly _actvidatedRoute: ActivatedRoute,
    private readonly _dialog: MatDialog,
    private readonly _router: Router,
    private readonly _estudiantePorTallerRestService: EstudiantePorTallerRestService,
  ) {
  }

  ngOnInit() {
    this.recuperarParametrosDeRuta();
    this.listarEstudiantePorTaller();
  }

  private recuperarParametrosDeRuta() {
    this._actvidatedRoute
      .params
      .subscribe(
        parametro => {
          this.idTaller = parametro.idTaller;
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

  listarEstudiantePorTaller() {
    this._estudiantePorTallerRestService.obtnerEstudiantePorTaller(this.idTaller, 0, 5)
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
    this._estudiantePorTallerRestService
      .obtnerEstudiantePorTaller(this.idTaller, evento.first, 5)
      .subscribe(
        (respuesta: RespuestaInterface) => {
          this.estudiantes = respuesta.data;
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
    const modalCrearEstudiantePorTaller$ = this._dialog.open(
      CrearEditarEstudiantePorTallerComponent, {
        width: '550px',
        data: false
      }
    );

    modalCrearEstudiantePorTaller$
      .afterClosed()
      .subscribe(
        (respuesta: EstudianteInterface[]) => {
          if (Array.isArray(respuesta)) {
            respuesta.forEach(
              (value: EstudianteInterface) => {
                const estudiantePorTaller: EstudiantePorTallerInterface = {
                  estudiante: value.id,
                  taller: +this.idTaller
                };
                this.guardarEstudiantePorTaller(estudiantePorTaller);
              }
            );
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

  guardarEstudiantePorTaller(estudiantePorTaller: EstudiantePorTallerInterface) {
    this._estudiantePorTallerRestService
      .guardar(estudiantePorTaller)
      .subscribe(
        value => {
          this._toasterService.pop({
            type: 'success',
            title: 'Correcto',
            body: 'Se guardo estudiante.',
            timeout: 1500,
            showCloseButton: true
          });
          this.listarEstudiantePorTaller();
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

  eliminarEstudiantePorTaller(estudiantePorTaller: EstudianteInterface) {
    this._estudiantePorTallerRestService
      .eliminar(
        estudiantePorTaller.id
      ).subscribe(
      value => {
        this._toasterService.pop({
          type: 'success',
          title: 'Correcto',
          body: 'Se elimino estudiante.',
          timeout: 1500,
          showCloseButton: true
        });
        this.listarEstudiantePorTaller();
      },
      error => {
        this._toasterService.pop({
          type: 'error',
          title: 'Error',
          body: 'No se elimino estudiante.',
          timeout: 1500,
          showCloseButton: true
        });
      }
    );
  }

  irAModuloHijo(
    estudiantePorTaller: EstudiantePorTallerInterface,
    moduloHijo: string) {
    if (typeof (estudiantePorTaller.estudiante) === 'object') {
      const ruta = [
        'inicio-modulo',
        'taller-modulo',
        this.idTaller,
        'estudiante-por-taller-modulo',
        estudiantePorTaller.estudiante.id,
        `${moduloHijo}-modulo`,
        `gestion-${moduloHijo}`
      ];
      this._router.navigate(ruta);
    }
  }
}
