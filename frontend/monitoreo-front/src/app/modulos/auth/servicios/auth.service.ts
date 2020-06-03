import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginInterface} from '../../login/interfaces/login.interface';
import {CookieService} from 'ngx-cookie';
import {tap} from 'rxjs/operators';
import {environment} from '../../../../environments/environment.prod';
import {JwtHelperService} from '@auth0/angular-jwt';
import {UsuarioInterface} from '../../usuario/interfaces/usuario.interface';
import * as moment from 'moment';

@Injectable()
export class AuthService {

  readonly URL = environment.urlServidor + 'auth';

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _cookieService: CookieService,
    private readonly _jwtHelperService: JwtHelperService
  ) {
  }

  obtnerTokenDeUsuario(credenciales: LoginInterface): Observable<any> {
    return this._httpClient
      .post(`${this.URL}/login`, credenciales)
      .pipe(
        tap(
          respuesta => {
            if (respuesta) {
              this._guardarDatosUsuarioLogeadoEnCookies(respuesta);
            }
          }
        )
      );
  }

  private _guardarDatosUsuarioLogeadoEnCookies(datos: { token: string, dataUser: object }) {
    this._cookieService.put('token', datos.token);
    // this._cookieService.put('usuario', JSON.stringify(datos.dataUser));
  }

  recuperarTokenDeCookies(): string {
    return this._cookieService.get('token');
  }

  recuperarUsuarioDeCookies(): string {
    return this._cookieService.get('usuario');
  }

  usuarioEstaAutenticado(): boolean {
    if (this._cookieService.get('token')) {
      return true;
    }
    return false;
  }

  verificarPermisos(): boolean {
    let esAdministrador: boolean;
    const token = this._cookieService.get('token');
    const tokenDecodificado = this._jwtHelperService.decodeToken(token);
    if (tokenDecodificado !== null) {
      const arregloDeRoles: string[] = tokenDecodificado.roles;
      esAdministrador = arregloDeRoles.includes('administrador');
    }
    return esAdministrador;
  }

  obtenerInformacionUsuario(): { usuario: string, fecha: string } {
    let usuario;
    let fechaSistema;
    const token = this._cookieService.get('token');
    const tokenDecodificado: UsuarioInterface = this._jwtHelperService.decodeToken(token);
    if (tokenDecodificado !== null) {
      const fecha = moment().format('LLL');
      usuario = `${tokenDecodificado.nombre} ${tokenDecodificado.apellido}`;
      fechaSistema = fecha;
    }
    return {
      usuario,
      fecha: fechaSistema
    };

  }

  eliminarDatosDeCookies() {
    this._cookieService.remove('token');
    this._cookieService.removeAll();
    // this._cookieService.remove('usuario');
  }
}
