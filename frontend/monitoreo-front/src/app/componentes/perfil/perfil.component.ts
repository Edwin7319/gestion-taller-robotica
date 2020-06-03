import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../modulos/auth/servicios/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  constructor(
    public readonly _authService: AuthService,
    private readonly _jwtHelperService: JwtHelperService,
  ) {
  }

  ngOnInit() {
  }

}
