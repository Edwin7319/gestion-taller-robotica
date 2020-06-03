import {Injectable} from '@angular/core';
import {GenericaRestService} from '../../../clases-genericas/generica.rest.service';
import {HttpClient} from '@angular/common/http';
import {EstudiantePorTallerInterface} from '../interfaces/estudiante-por-taller.interface';
import {Observable} from 'rxjs';
import {AuthService} from '../../auth/servicios/auth.service';
import {environment} from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EstudiantePorTallerRestService extends GenericaRestService<EstudiantePorTallerInterface> {

  readonly url = environment.urlServidor + 'estudiante-por-taller';

  constructor(
    protected readonly _httpClient: HttpClient,
    protected readonly _authService: AuthService
  ) {
    super(
      _httpClient,
      _authService
    );
    this.URL = environment.urlServidor;
    this.segmento = 'estudiante-por-taller';
  }

  obtnerEstudiantePorTaller(idTaller: number, skip: number, take: number): Observable<any> {
    return this._httpClient.get(`${this.url}/listar/${idTaller}?skip=${skip}&take=${take}`);
  }
}
