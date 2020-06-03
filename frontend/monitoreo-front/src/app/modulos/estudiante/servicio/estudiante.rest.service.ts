import {Injectable} from '@angular/core';
import {GenericaRestService} from '../../../clases-genericas/generica.rest.service';
import {EstudianteInterface} from '../interfaces/estudiante.interface';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../../auth/servicios/auth.service';
import {environment} from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EstudianteRestService extends GenericaRestService<EstudianteInterface> {

  constructor(
    protected readonly _httpClient: HttpClient,
    protected readonly _authService: AuthService
  ) {
    super(
      _httpClient,
      _authService
    );
    this.URL = environment.urlServidor;
    this.segmento = 'estudiante';
  }

  buscarEstudiantePorNombre(nombre: string): Observable<any> {
    return this._httpClient.post(`${environment.urlServidor}estudiante/buscar-estudiante?nombre=${nombre}`, '');
  }

  listarEstudiantesDisponibles(skip: number, take: number): Observable<any> {
    return this._httpClient.get(`${environment.urlServidor}estudiante/listar/estudiantes-disponibles?skip=${skip}&take=${take}`);
  }
}
