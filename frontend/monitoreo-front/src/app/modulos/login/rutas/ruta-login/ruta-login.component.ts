import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginInterface} from '../../interfaces/login.interface';
import {ToasterService} from 'angular2-toaster';
import {Router} from '@angular/router';
import {debounceTime} from 'rxjs/operators';
import {UsuarioRestService} from '../../../usuario/servicios/usuario.service';
import {CookieService} from 'ngx-cookie';
import {MASCARA_CEDULA} from '../../constantes/mascara-cedula';
import {MENSAJES_ERROR_CEDULA, MENSAJES_ERROR_PASSWORD} from '../../constantes/mensajes-de-error-login';
import {AuthService} from '../../../auth/servicios/auth.service';

@Component({
  selector: 'app-ruta-login',
  templateUrl: './ruta-login.component.html',
  styleUrls: ['./ruta-login.component.scss']
})
export class RutaLoginComponent implements OnInit {

  formularioLogin: FormGroup;
  credencialesAcceso: LoginInterface;
  mensajeError: string;
  noExisteUsuario = false;

  constructor(
    private readonly _toasterService: ToasterService,
    private readonly _usuarioRestService: UsuarioRestService,
    private readonly _router: Router,
    private readonly _cookieService: CookieService,
    private readonly _authService: AuthService
  ) {
    this.formularioLogin = new FormGroup({
      cedula: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(11),
        Validators.pattern(/[0-9]{9}[-][0-9]{1}|[0-9]{10}/)
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });
  }

  mascaraCedula = MASCARA_CEDULA;

  arregloMensajesDeErrorCedula: string[] = [];
  arregloMensajesDeErrorPassword: string[] = [];


  ngOnInit() {
    this.escucharFormulario();
    this.escucharCampo('cedula', this.arregloMensajesDeErrorCedula, MENSAJES_ERROR_CEDULA);
    this.escucharCampo('password', this.arregloMensajesDeErrorPassword, MENSAJES_ERROR_PASSWORD);
  }

  escucharFormulario() {
    this.formularioLogin
      .valueChanges
      .pipe(
        debounceTime(1800)
      )
      .subscribe(
        (valoresDeFormulario: LoginInterface) => {
          const esValido = this.formularioLogin.valid;
          if (esValido) {
            this._toasterService.pop({
              type: 'info',
              title: 'Correcto',
              body: 'Formulario correcto',
              timeout: 1000,
              showCloseButton: true
            });
            valoresDeFormulario.cedula = valoresDeFormulario.cedula.replace(/[-]+/g, '');
            this.credencialesAcceso = valoresDeFormulario;
          } else {
            this._toasterService.pop({
              type: 'warning',
              title: 'Cuidado',
              body: 'Formulario con errores',
              timeout: 1800,
              showCloseButton: true
            });
          }
        }
      );
  }

  escucharCampo(nombreCampo: string, arregloMensajesDeError: any[], objetoMensajesDeError: {}) {
    const campo$ = this.formularioLogin.get(nombreCampo);
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


  obtnerTokenDeUsuarioLogeado() {
    this._authService
      .obtnerTokenDeUsuario(this.credencialesAcceso)
      .subscribe(
        (value: { token: string }) => {
          this.noExisteUsuario = false;
          this._router.navigate([
            '/inicio-modulo'
          ]);
        },
        error => {
          this.noExisteUsuario = true;
          this.mensajeError = 'Usuario no encontrado';
          console.error({
            mensaje: 'Usuario no encontrado',
            error
          });
        }
      );
  }
}
