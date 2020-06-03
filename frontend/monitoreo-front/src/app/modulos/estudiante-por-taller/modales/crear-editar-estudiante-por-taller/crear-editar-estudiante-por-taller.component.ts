import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EstudiantePorTallerInterface} from '../../interfaces/estudiante-por-taller.interface';
import {RutaGestionEstudiantePorTallerComponent} from '../../rutas/ruta-gestion-estudiante-por-taller/ruta-gestion-estudiante-por-taller.component';
import {EstudianteInterface} from '../../../estudiante/interfaces/estudiante.interface';
import {RespuestaInterface} from '../../../../interfaces/respuesta.interface';
import {EstudianteRestService} from '../../../estudiante/servicio/estudiante.rest.service';
import {ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-crear-editar-estudiante-por-taller',
  templateUrl: './crear-editar-estudiante-por-taller.component.html',
  styleUrls: ['./crear-editar-estudiante-por-taller.component.scss']
})
export class CrearEditarEstudiantePorTallerComponent implements OnInit {

  estudiantes: any;
  estudiantesSeleccionados: EstudianteInterface[];
  registrosTotales: number;
  columnas: any[] = [
    {field: 'nombre', header: 'Nombre'},
    {field: 'apellido', header: 'Apellido'}
  ];

  constructor(
    private readonly _dialogRef: MatDialogRef<RutaGestionEstudiantePorTallerComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly _datos: EstudiantePorTallerInterface | boolean,
    private readonly _estudianteRestService: EstudianteRestService,
    private readonly _toasterService: ToasterService
  ) {
  }

  ngOnInit() {
    this.buscarEstudiantes();
  }

  enviarDatosFormulario() {
    this._dialogRef.close(this.estudiantesSeleccionados);
  }

  cancelarModal() {
    this._dialogRef.close();
  }


  buscarEstudiantes() {
    this._estudianteRestService.listarEstudiantesDisponibles(0, 5)
      .subscribe(
        (value: RespuestaInterface) => {
          this.estudiantes = value.data;
          this.registrosTotales = value.cantidad;
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo cargar datos.',
            timeout: 1500,
            showCloseButton: true
          });

        }
      );
  }

  cargarMasDatos(evento: any) {
    this._estudianteRestService
      .listarEstudiantesDisponibles(evento.first, 5)
      .subscribe(
        (respuesta: RespuestaInterface) => {
          this.estudiantes = respuesta.data;
        },
        error => {
          this._toasterService.pop({
            type: 'error',
            title: 'Error',
            body: 'No se pudo cargar datos.',
            timeout: 1500,
            showCloseButton: true
          });
        }
      );
  }

}
