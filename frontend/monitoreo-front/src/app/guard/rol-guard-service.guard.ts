import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthService} from '../modulos/auth/servicios/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class RolServiceGuard implements CanActivate {

  constructor(
    private readonly _authService: AuthService,
    private readonly _jwtHelperService: JwtHelperService,
    private readonly _router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const rolEsperado: string[] = next.data.expectedRoles;
    const token = this._authService.recuperarTokenDeCookies();
    const tokenDecodificado = this._jwtHelperService.decodeToken(token);
    if (!tokenDecodificado) {
      this._router.navigate(['/login-modulo']);
    }
    const rolesToken: string[] = tokenDecodificado.roles;

    let respuesta;
    // tslint:disable-next-line:forin
    for (const rol in rolEsperado) {
      respuesta = rolesToken.includes(rolEsperado[rol]);
      if (respuesta) {
        break;
      }
    }
    if (!respuesta) {

    }
    return respuesta;

  }

}
