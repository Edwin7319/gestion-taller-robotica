import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToasterService} from 'angular2-toaster';
import {SOLO_LETRAS} from '../../../../constantes/patter-validaciones';
import {debounceTime} from 'rxjs/operators';
import {EstudianteRestService} from '../../servicio/estudiante.rest.service';
import {EstudianteInterface} from '../../interfaces/estudiante.interface';
import {MENSAJES_DE_ERROR_APELLIDO, MENSAJES_DE_ERROR_NOMBRE} from './errores-estudiante-formulario';

@Component({
  selector: 'app-estudiante-formulario',
  templateUrl: './estudiante-formulario.component.html',
  styleUrls: ['./estudiante-formulario.component.scss']
})
export class EstudianteFormularioComponent implements OnInit {

  formularioEstudiante: FormGroup;
  @Output() datosEstudiante: EventEmitter<object | boolean> = new EventEmitter<object | boolean>();
  @Input() estudiante: EstudianteInterface;

  constructor(
    private readonly _toasterService: ToasterService,
    private readonly _estudianteRestService: EstudianteRestService,
  ) {
    this.formularioEstudiante = new FormGroup(
      {
        nombre: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
          Validators.pattern(SOLO_LETRAS)
        ]),
        apellido: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
          Validators.pattern(SOLO_LETRAS)
        ]),
        fechaNacimiento: new FormControl('', [
          Validators.required,
        ])
      },
    );
  }

  arregloMensajesDeErrorNombre: string[] = [];
  arregloMensajesDeErrorApellido: string[] = [];


  ngOnInit() {
    this.llenarFormularioEstudiante();
    this.escucharFormulario();
    this.escucharCampo('nombre', this.arregloMensajesDeErrorNombre, MENSAJES_DE_ERROR_NOMBRE);
    this.escucharCampo('apellido', this.arregloMensajesDeErrorApellido, MENSAJES_DE_ERROR_APELLIDO);
  }

  escucharFormulario() {
    this.formularioEstudiante
      .valueChanges
      .pipe(
        debounceTime(1800)
      )
      .subscribe(
        (valoresDeFormulario: EstudianteInterface) => {
          console.log(valoresDeFormulario);
          const esValido = this.formularioEstudiante.valid;
          if (esValido) {
            this._toasterService.pop({
              type: 'info',
              title: 'Correcto',
              body: 'Formulario correcto',
              timeout: 1500,
              showCloseButton: true
            });
            this.datosEstudiante.emit(valoresDeFormulario);
          } else {
            this._toasterService.pop({
              type: 'warning',
              title: 'Cuidado',
              body: 'Formulario con errores',
              timeout: 1500,
              showCloseButton: true
            });
            this.datosEstudiante.emit(false);
          }
        }
      );
  }

  escucharCampo(nombreCampo: string, arregloMensajesDeError: any[], objetoMensajesDeError: {}) {
    const campo$ = this.formularioEstudiante.get(nombreCampo);
    campo$
      .valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(
        campo => {
          arregloMensajesDeError.pop();
          arregloMensajesDeError.push(this.llenarMensajeDeError(
            campo$,
            objetoMensajesDeError
          ));
        }
      );
  }

  // // llenar mensajes de error
  llenarMensajeDeError(control: AbstractControl, objetoErrores: {}): string [] | boolean {
    if ((control.dirty || control.touched) && control.errors) {
      return Object.keys(control.errors).map(
        (llave) => {
          return objetoErrores[llave];
        }
      );
    } else {
      return false;
    }
  }

  enviarFormularioEstudiante() {
    // tslint:disable-next-line:no-unused-expression
    this.formularioEstudiante;
  }

  llenarFormularioEstudiante() {
    if (this.estudiante) {
      this.formularioEstudiante.setValue({
        nombre: this.estudiante.nombre,
        apellido: this.estudiante.apellido,
        fechaNacimiento: this.estudiante.fechaNacimiento
      });
    }
  }

}
