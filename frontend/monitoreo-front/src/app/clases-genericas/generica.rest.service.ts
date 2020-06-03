import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../modulos/auth/servicios/auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class GenericaRestService<Interfaz> {

  public URL = '';
  public segmento = '';

  constructor(
    protected readonly _httpClient: HttpClient,
    protected readonly _authService: AuthService
  ) {
  }

  obtnerDatos(skip: number, take: number): Observable<any> {
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._authService.recuperarTokenDeCookies()}`
      }
    );
    const options = {headers};
    return this._httpClient.get(`${this.URL + this.segmento}?skip=${skip}&take=${take}`, options);
  }

  actualizarUno(id: number, datos: Interfaz): Observable<any> {
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._authService.recuperarTokenDeCookies()}`
      }
    );
    const options = {headers};
    return this._httpClient.put(`${this.URL + this.segmento}/${id}`, datos, options);
  }

  guardar(datos: Interfaz): Observable<any> {
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._authService.recuperarTokenDeCookies()}`
      }
    );
    const options = {headers};
    return this._httpClient.post(`${this.URL + this.segmento}`, datos, options);
  }

  obtenerUno(id: number): Observable<any> {
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._authService.recuperarTokenDeCookies()}`
      }
    );
    const options = {headers};
    return this._httpClient.get(`${this.URL + this.segmento}/${id}`, options);
  }

  eliminar(id: number): Observable<any> {
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._authService.recuperarTokenDeCookies()}`
      }
    );
    const options = {headers};
    return this._httpClient.delete(`${this.URL + this.segmento}/${id}`, options);
  }
}
