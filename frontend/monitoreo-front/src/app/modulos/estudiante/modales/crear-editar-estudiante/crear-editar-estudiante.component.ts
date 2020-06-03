import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EstudianteInterface} from '../../interfaces/estudiante.interface';
import {RutaGestionEstudianteComponent} from '../../rutas/ruta-gestion-estudiante/ruta-gestion-estudiante.component';

@Component({
  selector: 'app-crear-editar-estudiante',
  templateUrl: './crear-editar-estudiante.component.html',
  styleUrls: ['./crear-editar-estudiante.component.scss']
})
export class CrearEditarEstudianteComponent implements OnInit {

  estudianteCrearEditar: EstudianteInterface | boolean;

  constructor(
    private readonly _dialogRef: MatDialogRef<RutaGestionEstudianteComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly _datos: EstudianteInterface | boolean
  ) {
  }

  ngOnInit() {
    if (!this._datos) {
    } else {
      this.estudianteCrearEditar = this._datos;
    }
  }

  crearEditarEstudiante(estudiante: EstudianteInterface | boolean) {
    (!estudiante) ? this.estudianteCrearEditar = undefined : this.estudianteCrearEditar = estudiante as object;
  }

  enviarDatosFormulario() {
    this._dialogRef.close(this.estudianteCrearEditar);
  }

  cancelarModal() {
    this._dialogRef.close();
  }

}
