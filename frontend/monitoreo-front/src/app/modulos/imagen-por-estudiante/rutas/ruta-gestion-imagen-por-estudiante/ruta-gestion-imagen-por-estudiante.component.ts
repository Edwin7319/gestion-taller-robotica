import {Component, OnInit} from '@angular/core';
import {EstudianteInterface} from '../../../estudiante/interfaces/estudiante.interface';
import {MatDialog} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {RespuestaInterface} from '../../../../interfaces/respuesta.interface';
import {ToasterService} from 'angular2-toaster';
import {ImagenPorEstudianteRestService} from '../../servicios/imagen-por-estudiante.rest.service';
import {ImagenPorEstudianteInterface} from '../../interfaces/imagen-por-estudiante.interface';
import {CrearEditarImagenPorEstudianteComponent} from '../../modales/crear-editar-imagen-por-estudiante/crear-editar-imagen-por-estudiante.component';
import {ImagenRestService} from '../../../imagen/servicio/rest/imagen.rest.service';
import {ImagenInterface} from '../../../imagen/interfaces/imagen.interface';

@Component({
  selector: 'app-ruta-gestion-imagen-por-estudiante',
  templateUrl: './ruta-gestion-imagen-por-estudiante.component.html',
  styleUrls: ['./ruta-gestion-imagen-por-estudiante.component.scss']
})
export class RutaGestionImagenPorEstudianteComponent implements OnInit {
  estudiantes: EstudianteInterface [] = [];
  columnas: any [] = [
    {field: 'imagen', header: 'IMAGEN'},
    {field: 'id', header: 'OPERACIONES'},
  ];

  idTaller: number;
  registrosTotales: number;
  idEstudiante: number;
  idImagen: number;

  constructor(
    private readonly _toasterService: ToasterService,
    private readonly _actvidatedRoute: ActivatedRoute,
    private readonly _dialog: MatDialog,
    private readonly _router: Router,
    private readonly _imagenPorEstudianteRestService: ImagenPorEstudianteRestService,
    private readonly _imagenRestService: ImagenRestService
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
        (parametro: {
          idTaller: number,
          idEstudiante: number
        }) => {
          this.idTaller = +parametro.idTaller;
          this.idEstudiante = +parametro.idEstudiante;
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
    this._imagenPorEstudianteRestService.obtenerImagenPorEstudiante(this.idEstudiante, 0, 5)
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
    this._imagenPorEstudianteRestService
      .obtenerImagenPorEstudiante(this.idEstudiante, evento.first, 5)
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
      CrearEditarImagenPorEstudianteComponent, {
        width: '550px',
        data: false
      }
    );

    modalCrearEstudiantePorTaller$
      .afterClosed()
      .subscribe(
        (respuesta) => {
          if (respuesta) {
            this.guardarImagen(respuesta);
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

  guardarImagen(url: string) {

    const imagen: ImagenInterface = {
      url
    };
    this._imagenRestService
      .guardar(imagen)
      .subscribe(
        (respuesta: { data: ImagenInterface, id: number }) => {
          this.guardarImagenPorEstudiante(respuesta.id, this.idEstudiante);
        },
        error => {
        }
      );
  }

  guardarImagenPorEstudiante(idImagen: number, idEstudiante: number) {
    const imagenPorEstudiante: ImagenPorEstudianteInterface = {
      estudiante: idEstudiante,
      imagen: idImagen
    };
    this._imagenPorEstudianteRestService
      .guardar(imagenPorEstudiante)
      .subscribe(
        value => {
          this.listarEstudiantePorTaller();
          this._toasterService.pop({
            type: 'success',
            title: 'Correcto',
            body: 'Imagen guardada.',
            timeout: 1500,
            showCloseButton: true
          });
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No guardo imagen.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  eliminarImagenEstudiante(imagenPorEstudiante: ImagenPorEstudianteInterface) {
    if (typeof (imagenPorEstudiante.imagen) === 'object') {
      this.idImagen = imagenPorEstudiante.imagen.id;
    }
    this._imagenPorEstudianteRestService
      .eliminar(imagenPorEstudiante.id)
      .subscribe(
        value => {
          this.listarEstudiantePorTaller();
          this.eliminarImagen(this.idImagen);
          this._toasterService.pop({
            type: 'success',
            title: 'Correcto',
            body: 'Imagen eliminada.',
            timeout: 1500,
            showCloseButton: true
          });
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No elimino imagen.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  eliminarImagen(idImagen: number) {
    this._imagenRestService
      .eliminar(idImagen)
      .subscribe(
        value => {
        },
        error => {
        }
      );
  }


  irAModuloHijo(
    estudiantePorTaller: ImagenPorEstudianteInterface,
    moduloHijo: string) {
    if (typeof (estudiantePorTaller.estudiante) === 'object') {
      const ruta = [
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
