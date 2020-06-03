import {Injectable} from '@angular/core';
import {GenericaRestService} from '../../../clases-genericas/generica.rest.service';
import {RolInterface} from '../interfaces/rol.interface';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../auth/servicios/auth.service';
import {environment} from '../../../../environments/environment.prod';

@Injectable()
export class RolRestService extends GenericaRestService<RolInterface> {

  constructor(
    protected readonly _httpClient: HttpClient,
    protected readonly _authService: AuthService
  ) {
    super(
      _httpClient,
      _authService
    );
    this.URL = environment.urlServidor;
    this.segmento = 'rol';
  }
}
