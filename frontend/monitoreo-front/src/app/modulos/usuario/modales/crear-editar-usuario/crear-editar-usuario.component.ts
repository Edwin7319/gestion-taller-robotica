import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UsuarioInterface} from '../../interfaces/usuario.interface';
import {RutaGestionUsuarioComponent} from '../../rutas/ruta-gestion-usuario/ruta-gestion-usuario.component';

@Component({
  selector: 'app-crear-editar-usuario',
  templateUrl: './crear-editar-usuario.component.html',
  styleUrls: ['./crear-editar-usuario.component.scss']
})
export class CrearEditarUsuarioComponent implements OnInit {

  usuarioCrearEditar: UsuarioInterface | boolean;

  constructor(
    private readonly _dialogRef: MatDialogRef<RutaGestionUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly _datos: UsuarioInterface | boolean
  ) {
  }

  ngOnInit() {
    if (!this._datos) {
    } else {
      this.usuarioCrearEditar = this._datos;
    }
  }

  crearEditarUsuario(usuario: UsuarioInterface | boolean) {
    (!usuario) ? this.usuarioCrearEditar = undefined : this.usuarioCrearEditar = usuario as object;
  }

  enviarDatosFormulario() {
    this._dialogRef.close(this.usuarioCrearEditar);
  }

  cancelarModal() {
    this._dialogRef.close();
  }

}
