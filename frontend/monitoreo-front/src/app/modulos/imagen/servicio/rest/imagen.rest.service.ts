import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GenericaRestService} from '../../../../clases-genericas/generica.rest.service';
import {ImagenInterface} from '../../interfaces/imagen.interface';
import {AuthService} from '../../../auth/servicios/auth.service';
import {environment} from '../../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ImagenRestService extends GenericaRestService<ImagenInterface> {

  constructor(
    protected readonly _httpClient: HttpClient,
    protected readonly _authService: AuthService
  ) {
    super(
      _httpClient,
      _authService
    );
    this.URL = environment.urlServidor;
    this.segmento = 'imagen';
  }
}
