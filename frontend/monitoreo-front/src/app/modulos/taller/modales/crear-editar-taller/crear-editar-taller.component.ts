import {Component, Inject, OnInit} from '@angular/core';
import {TallerInterface} from '../../interfaces/taller.interface';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {RutaGestionTallerComponent} from '../../rutas/ruta-gestion-taller/ruta-gestion-taller.component';

@Component({
  selector: 'app-crear-editar-taller',
  templateUrl: './crear-editar-taller.component.html',
  styleUrls: ['./crear-editar-taller.component.scss']
})
export class CrearEditarTallerComponent implements OnInit {

  tallerCrearEditar: TallerInterface | boolean;

  constructor(
    private readonly _dialogRef: MatDialogRef<RutaGestionTallerComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly _datos: TallerInterface | boolean
  ) {
  }

  ngOnInit() {
    if (!this._datos) {
    } else {
      this.tallerCrearEditar = this._datos;
    }
  }

  crearEditarTaller(taller: TallerInterface | boolean) {
    (!taller) ? this.tallerCrearEditar = undefined : this.tallerCrearEditar = taller as object;
  }

  enviarDatosFormulario() {
    this._dialogRef.close(this.tallerCrearEditar);
  }

  cancelarModal() {
    this._dialogRef.close();
  }

}
