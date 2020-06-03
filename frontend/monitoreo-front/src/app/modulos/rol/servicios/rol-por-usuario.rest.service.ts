import {Injectable} from '@angular/core';
import {GenericaRestService} from '../../../clases-genericas/generica.rest.service';
import {RolPoUsuarioInterface} from '../interfaces/rol-po-usuario.interface';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../auth/servicios/auth.service';
import {environment} from '../../../../environments/environment.prod';

@Injectable()
export class RolPorUsuarioRestService extends GenericaRestService <RolPoUsuarioInterface> {

  constructor(
    protected readonly _httpClient: HttpClient,
    protected readonly _authService: AuthService
  ) {
    super(
      _httpClient,
      _authService
    );
    this.URL = environment.urlServidor;
    this.segmento = 'rol-por-usuario';
  }
}
