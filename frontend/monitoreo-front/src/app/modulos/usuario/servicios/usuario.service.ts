import {Injectable} from '@angular/core';
import {GenericaRestService} from '../../../clases-genericas/generica.rest.service';
import {HttpClient} from '@angular/common/http';
import {UsuarioInterface} from '../interfaces/usuario.interface';
import {AuthService} from '../../auth/servicios/auth.service';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsuarioRestService extends GenericaRestService<UsuarioInterface> {

  constructor(
    protected readonly _httpClient: HttpClient,
    protected readonly _authService: AuthService
  ) {
    super(
      _httpClient,
      _authService
    );
    this.URL = environment.urlServidor;
    this.segmento = 'usuario';
  }

  guardarUsuario(datos: UsuarioInterface): Observable<any> {
    return this._httpClient.post(`${this.URL}${this.segmento}/crear`, datos);
  }

  buscarUsuarioPorNombre(nombre: string): Observable<any> {
    return this._httpClient.post(`${environment.urlServidor}usuario/buscar-usuario?nombre=${nombre}`, '');
  }

}
