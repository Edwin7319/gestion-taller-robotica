import {Injectable} from '@angular/core';
import {GenericaRestService} from '../../../clases-genericas/generica.rest.service';
import {ImagenPorEstudianteInterface} from '../interfaces/imagen-por-estudiante.interface';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../../auth/servicios/auth.service';
import {environment} from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ImagenPorEstudianteRestService extends GenericaRestService<ImagenPorEstudianteInterface> {

  readonly url = environment.urlServidor + 'imagen-por-estudiante';

  constructor(
    protected readonly _httpClient: HttpClient,
    protected readonly _authService: AuthService
  ) {
    super(
      _httpClient,
      _authService
    );
    this.URL = environment.urlServidor;
    this.segmento = 'imagen-por-estudiante';
  }

  obtenerImagenPorEstudiante(idEstudiante: number, skip: number, take: number): Observable<any> {
    return this._httpClient.get(`${this.url}/listar/${idEstudiante}?skip=${skip}&take=${take}`);
  }
}
