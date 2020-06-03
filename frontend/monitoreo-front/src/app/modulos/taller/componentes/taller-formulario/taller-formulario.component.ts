import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {TallerInterface} from '../../interfaces/taller.interface';
import {ToasterService} from 'angular2-toaster';
import {TallerRestService} from '../../servicios/taller.rest.service';
import {debounceTime} from 'rxjs/operators';
import {MENSAJES_DE_ERROR_DESCRIPCION} from './constantes-errores';
import {LETRAS_NUMEROS_ESPACIOS} from '../../../../constantes/patter-validaciones';

@Component({
  selector: 'app-taller-formulario',
  templateUrl: './taller-formulario.component.html',
  styleUrls: ['./taller-formulario.component.scss']
})
export class TallerFormularioComponent implements OnInit {

  formularioTaller: FormGroup;
  @Output() datosTaller: EventEmitter<object | boolean> = new EventEmitter<object | boolean>();
  @Input() taller: TallerInterface;

  constructor(
    private readonly _toasterService: ToasterService,
    private readonly _tallerRestService: TallerRestService,
  ) {
    this.formularioTaller = new FormGroup({
      descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(LETRAS_NUMEROS_ESPACIOS)
      ]),
    });
  }

  arregloMensajesDeErrorDescripcion: string[] = [];


  ngOnInit() {
    this.llenarFormularioMecanica();
    this.escucharFormulario();
    this.escucharCampo('descripcion', this.arregloMensajesDeErrorDescripcion, MENSAJES_DE_ERROR_DESCRIPCION);
  }

  escucharFormulario() {
    this.formularioTaller
      .valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(
        (valoresDeFormulario: TallerInterface) => {
          const esValido = this.formularioTaller.valid;
          if (esValido) {
            this._toasterService.pop({
              type: 'info',
              title: 'Correcto',
              body: 'Formulario correcto',
              timeout: 1500,
              showCloseButton: true
            });
            this.datosTaller.emit(valoresDeFormulario);
          } else {
            this._toasterService.pop({
              type: 'warning',
              title: 'Cuidado',
              body: 'Formulario con errores',
              timeout: 1500,
              showCloseButton: true
            });
            this.datosTaller.emit(false);
          }
        }
      );
  }

  escucharCampo(nombreCampo: string, arregloMensajesDeError: any[], objetoMensajesDeError: {}) {
    const campo$ = this.formularioTaller.get(nombreCampo);
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

  enviarFormularioTaller() {
    // tslint:disable-next-line:no-unused-expression
    this.formularioTaller;
  }

  llenarFormularioMecanica() {
    if (this.taller) {
      this.formularioTaller.setValue({
        descripcion: this.taller.descripcion
      });
    }
  }

}
