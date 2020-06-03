import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../modulos/auth/servicios/auth.service';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public readonly _authService: AuthService,
    private readonly _router: Router,
    private readonly _jwtHelperService: JwtHelperService
  ) {
  }

  ngOnInit() {
  }


  salirSistema() {
    this._authService.eliminarDatosDeCookies();
    this._router.navigate([
      '/login-modulo'
    ]);
  }

  irAModulo(inicio: string, modulo: string) {
    const ruta = [
      `/${inicio}-modulo`,
      `${modulo}-modulo`
    ];
    this._router.navigate(ruta);
  }

  irACamara() {
    this._router.navigate(['/reconocimiento-facial-modulo']);
  }
}
