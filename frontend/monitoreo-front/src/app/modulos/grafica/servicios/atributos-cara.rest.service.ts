import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AtributosCaraRestService {

  readonly URL = environment.urlServidor;
  readonly segmento = 'atributos-cara';

  constructor(
    protected readonly _httpClient: HttpClient
  ) {
  }

  insertarAtributosEnMongo(datos: any): Observable<any> {
    return this._httpClient.post(this.URL + this.segmento, datos);
  }

  obtnerDatosGuardadosEnMongo(): Observable<any> {
    return this._httpClient.get(this.URL + this.segmento);
  }

  obtenerDatosPorFecha(fecha: { fechaInicio: string, fechaFin: string }): Observable<any> {
    return this._httpClient.put(this.URL + this.segmento, fecha);
  }
}
