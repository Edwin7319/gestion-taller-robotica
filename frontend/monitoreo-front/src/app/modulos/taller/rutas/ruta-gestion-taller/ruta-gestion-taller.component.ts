import {Component, OnInit} from '@angular/core';
import {TallerInterface} from '../../interfaces/taller.interface';
import {ToasterService} from 'angular2-toaster';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {TallerRestService} from '../../servicios/taller.rest.service';
import {RespuestaInterface} from '../../../../interfaces/respuesta.interface';
import {CrearEditarTallerComponent} from '../../modales/crear-editar-taller/crear-editar-taller.component';
import {ConfirmationService} from 'primeng';

@Component({
  selector: 'app-ruta-gestion-taller',
  templateUrl: './ruta-gestion-taller.component.html',
  styleUrls: ['./ruta-gestion-taller.component.scss']
})
export class RutaGestionTallerComponent implements OnInit {

  talleres: TallerInterface [] = [];
  columnas: any [] = [
    {field: 'descripcion', header: 'Descripcion'},
    {field: 'fechaTaller', header: 'Fecha'},
    {field: 'habilitado', header: 'Estado'},
    {field: 'id', header: 'Acciones'}
  ];

  registrosTotales: number;

  constructor(
    private readonly _toasterService: ToasterService,
    private readonly _dialog: MatDialog,
    private readonly _router: Router,
    private readonly _tallerRestService: TallerRestService,
    private readonly _modalConfirmacion: ConfirmationService
  ) {
  }

  ngOnInit() {
    this.listarTalleres();
  }

  listarTalleres() {
    this._tallerRestService.obtnerDatos(0, 5)
      .subscribe(
        (respuesta: RespuestaInterface) => {
          this.talleres = respuesta.data;
          this.registrosTotales = respuesta.cantidad;
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
    this._tallerRestService
      .obtnerDatos(evento.first, 5)
      .subscribe(
        (respuesta: RespuestaInterface) => {
          this.talleres = respuesta.data;
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

  cambiarEstado(taller: TallerInterface) {
    const idTaller = taller.id;
    const nuevoEstado = (taller.habilitado) ? 0 : 1;
    const tallerActualizada = {
      habilitado: nuevoEstado
    };
    this._tallerRestService.actualizarUno(idTaller, tallerActualizada)
      .subscribe(
        (respuestaActualizacion) => {
          this._toasterService.pop('success', 'Correcto', 'Guardado correctamente');
          taller.habilitado = nuevoEstado;
        },
        error => {
          this._toasterService.pop('error', 'Error', 'Error con el servidor.');
        }
      );

  }

  abrirModalCrear() {
    const modalCrearTaller$ = this._dialog.open(
      CrearEditarTallerComponent, {
        width: '35rem',
        data: false
      }
    );

    modalCrearTaller$
      .afterClosed()
      .subscribe(
        (respuesta: TallerInterface) => {
          const existenDatos = respuesta !== undefined;
          if (existenDatos) {
            const fechaActual = new Date();
            const fechaFormato = fechaActual.getFullYear() + '-' + (fechaActual.getMonth() + 1) + '-' + fechaActual.getDate();
            respuesta.fechaTaller = fechaFormato.toString();
            this.crearTaller(respuesta);
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

  abrirModalEditar(filaTaller: TallerInterface) {
    const indice = this.talleres.indexOf(filaTaller);
    const modalEditar$ = this._dialog.open(
      CrearEditarTallerComponent, {
        width: '35rem',
        data: filaTaller
      }
    );
    modalEditar$
      .afterClosed()
      .subscribe(
        (respuesta: TallerInterface) => {
          if (respuesta) {
            this.editarTaller(respuesta, filaTaller.id, indice);
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

  crearTaller(datos: TallerInterface) {
    const existenDatos = datos !== undefined;
    if (existenDatos) {
      this._tallerRestService.guardar(datos)
        .subscribe(
          (respuesta: any) => {
            this.talleres.unshift(respuesta.data);
            this._toasterService.pop({
              type: 'success',
              title: 'Exito',
              body: 'Taller guardada con exito.',
              timeout: 1500,
              showCloseButton: true
            });
          },
          error => {
            this._toasterService.pop({
              type: 'error',
              title: 'Error',
              body: 'No se pudo gaurdar taller.',
              timeout: 1500,
              showCloseButton: true
            });
          }
        );
    }
  }

  editarTaller(datos: TallerInterface, idTaller: number, indiceTaller: number) {
    const existenDatos = datos !== undefined;
    if (existenDatos) {
      this._tallerRestService.actualizarUno(idTaller, datos)
        .subscribe(
          (respuesta: any) => {
            console.log(respuesta);
            this.talleres[indiceTaller] = respuesta;
            this._toasterService.pop({
              type: 'success',
              title: 'Exito',
              body: 'Taller editado con exito.',
              timeout: 1500,
              showCloseButton: true
            });
          },
          error => {
            this._toasterService.pop({
              type: 'error',
              title: 'Error',
              body: 'No se pudo editar taller.',
              timeout: 1500,
              showCloseButton: true
            });
          }
        );
    }
  }

  eliminarTaller(taller: TallerInterface) {
    console.log(taller);
    const indiceTaller = this.talleres.indexOf(taller);
    this._modalConfirmacion
      .confirm({
        message: `Desea eliminar el taller ${taller.descripcion}`,
        header: 'CONFIRMACION',
        accept: () => {
          this._tallerRestService
            .eliminar(taller.id)
            .subscribe(
              value => {
                this.talleres.splice(indiceTaller, 1);
                this._toasterService.pop({
                  type: 'success',
                  title: 'Exito',
                  body: 'Taller eliminado con exito.',
                  timeout: 1500,
                  showCloseButton: true
                });
              },
              error => {
                this._toasterService.pop({
                  type: 'error',
                  title: 'Error',
                  body: 'No se pudo eliminar taller.',
                  timeout: 1500,
                  showCloseButton: true
                });
              }
            );
        },
        reject: () => {
        }
      });
  }

  irAModuloHijo(
    taller: TallerInterface,
    moduloHijo: string
  ) {
    const ruta = [
      'inicio-modulo',
      'taller-modulo',
      taller.id,
      `${moduloHijo}-modulo`,
      `gestion-${moduloHijo}`,
    ];
    this._router.navigate(ruta);
  }
}
