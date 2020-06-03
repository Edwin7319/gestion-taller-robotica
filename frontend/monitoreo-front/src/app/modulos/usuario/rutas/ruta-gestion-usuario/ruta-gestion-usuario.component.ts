import {Component, OnInit} from '@angular/core';
import {EstudianteInterface} from '../../../estudiante/interfaces/estudiante.interface';
import {ToasterService} from 'angular2-toaster';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {RespuestaInterface} from '../../../../interfaces/respuesta.interface';
import {CrearEditarEstudianteComponent} from '../../../estudiante/modales/crear-editar-estudiante/crear-editar-estudiante.component';
import {UsuarioInterface} from '../../interfaces/usuario.interface';
import {UsuarioRestService} from '../../servicios/usuario.service';
import {CrearEditarUsuarioComponent} from '../../modales/crear-editar-usuario/crear-editar-usuario.component';
import {RolPorUsuarioRestService} from '../../../rol/servicios/rol-por-usuario.rest.service';
import {RolInterface} from '../../../rol/interfaces/rol.interface';

@Component({
  selector: 'app-ruta-gestion-usuario',
  templateUrl: './ruta-gestion-usuario.component.html',
  styleUrls: ['./ruta-gestion-usuario.component.scss']
})
export class RutaGestionUsuarioComponent implements OnInit {

  usuarios: UsuarioInterface [] = [];
  columnas: any [] = [
    {field: 'nombre', header: 'Nombre'},
    {field: 'apellido', header: 'Apellido'},
    {field: 'cedula', header: 'Cedula'},
    {field: 'correo', header: 'Correo'},
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
    private readonly _usuarioRestService: UsuarioRestService,
    private readonly _rolPorUsuarioRestService: RolPorUsuarioRestService
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
            this.listarUsuario();
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

  listarUsuario() {
    this._usuarioRestService.obtnerDatos(0, 5)
      .subscribe(
        (respuesta: RespuestaInterface) => {
          this.usuarios = respuesta.data;
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
    this._usuarioRestService
      .obtnerDatos(evento.first, 5)
      .subscribe(
        (respuesta: RespuestaInterface) => {
          if (!this.buscarPorParametros) {
            this.usuarios = respuesta.data;
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
    const modalCrearUsuario$ = this._dialog.open(
      CrearEditarUsuarioComponent, {
        width: '550px',
        data: false
      }
    );

    modalCrearUsuario$
      .afterClosed()
      .subscribe(
        (respuesta: UsuarioInterface) => {
          if (respuesta) {
            this.guardarUsuario(respuesta);
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

  guardarRolesPorUsuario(idUsuario: number, roles: RolInterface[]) {
    roles.map(
      value => {
        return {
          rol: value.id,
          usuario: idUsuario
        };
      }
    ).forEach(
      value => {
        this._rolPorUsuarioRestService
          .guardar(value)
          .subscribe(
            respuesta => {
              console.log(respuesta);
            },
            error => {
              console.error({
                mensaje: 'No se guardo roles por usuario',
                usuario: idUsuario,
                query: value,
                error
              });
            }
          );
      }
    );
  }

  guardarUsuario(usuario: UsuarioInterface) {
    this._usuarioRestService
      .guardarUsuario(usuario)
      .subscribe(
        (value: UsuarioInterface) => {
          this._toasterService.pop({
            type: 'success',
            title: 'Correcto',
            body: 'Se guardo usuario.',
            timeout: 1500,
            showCloseButton: true
          });
          this.guardarRolesPorUsuario(value.id, value.rol);
          this.listarUsuario();
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se guardo usuario.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  abrirModalEditar(usuario: UsuarioInterface) {
    const modalEditarUsuario$ = this._dialog.open(
      CrearEditarUsuarioComponent, {
        width: '550px',
        data: usuario
      }
    );

    modalEditarUsuario$
      .afterClosed()
      .subscribe(
        (respuesta: UsuarioInterface) => {
          if (respuesta) {
            const query = {
              nombre: respuesta.nombre,
              apellido: respuesta.apellido,
              correo: respuesta.correo,
              cedula: respuesta.cedula
            };
            this.editarUsuario(usuario.id, query);
          }
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se abrir modal usuario.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  editarUsuario(idUsuario: number, dato: UsuarioInterface) {
    this._usuarioRestService
      .actualizarUno(idUsuario, dato)
      .subscribe(
        value => {
          this._toasterService.pop({
            type: 'success',
            title: 'Correcto',
            body: 'Se guardo usuario.',
            timeout: 1500,
            showCloseButton: true
          });
          this.listarUsuario();
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se guardo usuario.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

  cambiarEstado(usuario: UsuarioInterface) {
    const idUsuario = usuario.id;
    const nuevoEstado = (usuario.habilitado) ? 0 : 1;
    const usuarioActualizada: UsuarioInterface = {
      habilitado: nuevoEstado
    };
    this._usuarioRestService
      .actualizarUno(idUsuario, usuarioActualizada)
      .subscribe(
        (respuestaActualizacion) => {
          this._toasterService.pop('success', 'Correcto', 'Guardado correctamente');
          usuario.habilitado = nuevoEstado;
        },
        error => {
          this._toasterService.pop('error', 'Error', 'Error con el servidor.');
        }
      );

  }

  buscarPorNombre(nombreBuscar: string) {
    const ruta = [
      '/inicio-modulo',
      'usuario-modulo',
      'gestion-usuario'
    ];
    if (nombreBuscar === '') {
      this._router.navigate(ruta);
      // this.listarUsuario();
    } else {
      this._router.navigate(ruta, {queryParams: {nombre: nombreBuscar}});
      this._usuarioRestService
        .buscarUsuarioPorNombre(
          nombreBuscar
        ).subscribe(
        value => {
          this.usuarios = value[0];
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
