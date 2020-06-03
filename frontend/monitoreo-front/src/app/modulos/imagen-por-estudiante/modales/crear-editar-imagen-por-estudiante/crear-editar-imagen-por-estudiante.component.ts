import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {RutaGestionImagenPorEstudianteComponent} from '../../rutas/ruta-gestion-imagen-por-estudiante/ruta-gestion-imagen-por-estudiante.component';
import {ImagenPorEstudianteInterface} from '../../interfaces/imagen-por-estudiante.interface';

@Component({
  selector: 'app-crear-editar-imagen-por-estudiante',
  templateUrl: './crear-editar-imagen-por-estudiante.component.html',
  styleUrls: ['./crear-editar-imagen-por-estudiante.component.scss']
})
export class CrearEditarImagenPorEstudianteComponent implements OnInit {

  linkImagen: string | boolean;

  constructor(
    private readonly _dialogRef: MatDialogRef<RutaGestionImagenPorEstudianteComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly _datos: string | boolean
  ) {
  }

  ngOnInit() {
    if (!this._datos) {
    } else {
      this.linkImagen = this._datos;
    }
  }

  escucharLinkImagen(evento: string) {
    (!evento) ? this.linkImagen = undefined : this.linkImagen = evento;
  }

  enviarDatosFormulario() {
    this._dialogRef.close(this.linkImagen);
  }

  cancelarModal() {
    this._dialogRef.close();
  }
}
