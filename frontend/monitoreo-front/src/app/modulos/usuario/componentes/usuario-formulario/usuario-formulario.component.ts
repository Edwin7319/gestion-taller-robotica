import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToasterService} from 'angular2-toaster';
import {CORREO, PASSWORD, SOLO_LETRAS, SOLO_NUMEROS} from '../../../../constantes/patter-validaciones';
import {debounceTime} from 'rxjs/operators';
import {MENSAJES_DE_ERROR_CEDULA, MENSAJES_DE_ERROR_CORREO, MENSAJES_DE_ERROR_PASSWORD, MENSAJES_DE_ERROR_REQUERIDO} from './mensajes-de-error';
import {EstudianteRestService} from '../../../estudiante/servicio/estudiante.rest.service';
import {MENSAJES_DE_ERROR_APELLIDO, MENSAJES_DE_ERROR_NOMBRE} from '../../../estudiante/componentes/estudiante-formulario/errores-estudiante-formulario';
import {UsuarioInterface} from '../../interfaces/usuario.interface';
import {RolRestService} from '../../../rol/servicios/rol.rest.service';
import {RolInterface} from '../../../rol/interfaces/rol.interface';

@Component({
  selector: 'app-usuario-formulario',
  templateUrl: './usuario-formulario.component.html',
  styleUrls: ['./usuario-formulario.component.scss']
})
export class UsuarioFormularioComponent implements OnInit {

  formularioUsuario: FormGroup;
  @Output() datosUsuario: EventEmitter<object | boolean> = new EventEmitter<object | boolean>();
  @Input() usuario: UsuarioInterface;

  roles: RolInterface[];
  estaEditando = false;

  constructor(
    private readonly _toasterService: ToasterService,
    private readonly _usuarioRestService: EstudianteRestService,
    private readonly _rolRestService: RolRestService
  ) {
    this.formularioUsuario = new FormGroup(
      {
        nombre: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
          Validators.pattern(SOLO_LETRAS)
        ]),
        apellido: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
          Validators.pattern(SOLO_LETRAS)
        ]),
        cedula: new FormControl('', [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(SOLO_NUMEROS)
        ]),
        password: new FormControl('', [
          Validators.minLength(5),
          Validators.maxLength(256),
        ]),
        correo: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(75),
          Validators.pattern(CORREO)
        ]),
        rol: new FormControl('', [
          Validators.required
        ])
      },
    );
  }

  arregloMensajesDeErrorNombre: string[] = [];
  arregloMensajesDeErrorApellido: string[] = [];
  arregloMensajesDeErrorCedula: string[] = [];
  arregloMensajesDeErrorPassword: string[] = [];
  arregloMensajesDeErrorCorreo: string[] = [];
  arregloMensajesDeErrorRol: string[] = [];


  ngOnInit() {
    this.llenarFormularioEstudiante();
    this.listarRoles();
    this.escucharFormulario();
    this.escucharCampo('nombre', this.arregloMensajesDeErrorNombre, MENSAJES_DE_ERROR_NOMBRE);
    this.escucharCampo('apellido', this.arregloMensajesDeErrorApellido, MENSAJES_DE_ERROR_APELLIDO);
    this.escucharCampo('cedula', this.arregloMensajesDeErrorCedula, MENSAJES_DE_ERROR_CEDULA);
    this.escucharCampo('password', this.arregloMensajesDeErrorPassword, MENSAJES_DE_ERROR_PASSWORD);
    this.escucharCampo('correo', this.arregloMensajesDeErrorCorreo, MENSAJES_DE_ERROR_CORREO);
    this.escucharCampo('rol', this.arregloMensajesDeErrorRol, MENSAJES_DE_ERROR_REQUERIDO);
  }

  escucharFormulario() {
    this.formularioUsuario
      .valueChanges
      .pipe(
        debounceTime(1800)
      )
      .subscribe(
        (valoresDeFormulario: UsuarioInterface) => {
          const esValido = this.formularioUsuario.valid;
          if (esValido) {
            this._toasterService.pop({
              type: 'info',
              title: 'Correcto',
              body: 'Formulario correcto',
              timeout: 1500,
              showCloseButton: true
            });
            this.datosUsuario.emit(valoresDeFormulario);
          } else {
            this._toasterService.pop({
              type: 'warning',
              title: 'Cuidado',
              body: 'Formulario con errores',
              timeout: 1500,
              showCloseButton: true
            });
            this.datosUsuario.emit(false);
          }
        }
      );
  }

  escucharCampo(nombreCampo: string, arregloMensajesDeError: any[], objetoMensajesDeError: {}) {
    const campo$ = this.formularioUsuario.get(nombreCampo);
    campo$
      .valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(
        campo => {
          arregloMensajesDeError.pop();
          arregloMensajesDeError.push(this.llenarMensajeDeError(
            campo$,
            objetoMensajesDeError
          ));
        }
      );
  }

  // // llenar mensajes de error
  llenarMensajeDeError(control: AbstractControl, objetoErrores: {}): string [] | boolean {
    if ((control.dirty || control.touched) && control.errors) {
      return Object.keys(control.errors).map(
        (llave) => {
          return objetoErrores[llave];
        }
      );
    } else {
      return false;
    }
  }

  enviarFormularioEstudiante() {
    // tslint:disable-next-line:no-unused-expression
    this.formularioUsuario;
  }

  llenarFormularioEstudiante() {
    if (this.usuario) {
      this.estaEditando = true;
      this.formularioUsuario.patchValue({
        nombre: this.usuario.nombre,
        apellido: this.usuario.apellido,
        cedula: this.usuario.cedula,
        correo: this.usuario.correo,
      });
    }
  }

  listarRoles() {
    this._rolRestService
      .obtnerDatos(0, 20)
      .subscribe(
        value => {
          this.roles = value.data;
        },
        error => {
          console.error({
            mensaje: 'Error encontrando roles'
          });
        }
      );
  }

}
