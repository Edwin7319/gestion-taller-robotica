import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToasterService} from 'angular2-toaster';
import {debounceTime} from 'rxjs/operators';
import {MENSAJES_DE_ERROR_ETAPA, MENSAJES_DE_ERROR_FECHA_TALLER, MENSAJES_DE_ERROR_HORA_FIN, MENSAJES_DE_ERROR_HORA_INICIA} from './mensajes-error-filtros-fecha';

@Component({
  selector: 'app-filtro-busqueda-fecha',
  templateUrl: './filtro-busqueda-fecha.component.html',
  styleUrls: ['./filtro-busqueda-fecha.component.scss']
})
export class FiltroBusquedaFechaComponent implements OnInit {

  filtroFecha: FormGroup;
  @Output() parametrosSeleccionados: EventEmitter<any> = new EventEmitter<any>();
  @Input() parametrosDeBusqueda;

  constructor(
    private readonly _toasterService: ToasterService,
  ) {
    this.filtroFecha = new FormGroup({
      fechaTaller: new FormControl('', [
        Validators.required
      ]),
      horaInicio: new FormControl('', [
        Validators.required
      ]),
      horaFin: new FormControl('', [
        Validators.required
      ]),
      etapa: new FormControl('', [
        Validators.required
      ])
    });
  }

  arregloMensajesDeErrorFechaTaller: string[] = [];
  arregloMensajesDeErrorHoraInicio: string[] = [];
  arregloMensajesDeErrorHoraFin: string[] = [];
  arregloMensajesDeErrorEtapa: string[] = [];

  ngOnInit() {
    this.escucharFormulario();
    this.escucharCampo('fechaTaller', this.arregloMensajesDeErrorFechaTaller, MENSAJES_DE_ERROR_FECHA_TALLER);
    this.escucharCampo('horaInicio', this.arregloMensajesDeErrorHoraInicio, MENSAJES_DE_ERROR_HORA_INICIA);
    this.escucharCampo('horaFin', this.arregloMensajesDeErrorHoraFin, MENSAJES_DE_ERROR_HORA_FIN);
    this.escucharCampo('etapa', this.arregloMensajesDeErrorEtapa, MENSAJES_DE_ERROR_ETAPA);
    this.llenarFormulario();
  }

  escucharFormulario() {
    this.filtroFecha
      .valueChanges
      .pipe(
        debounceTime(1800)
      )
      .subscribe(
        (valoresDeFormulario) => {
          console.log(valoresDeFormulario);
          const esValido = this.filtroFecha.valid;
          if (esValido) {
            this._toasterService.pop({
              type: 'info',
              title: 'Correcto',
              body: 'Fitros correcto',
              timeout: 1500,
              showCloseButton: true
            });
            this.parametrosSeleccionados.emit(valoresDeFormulario);
          } else {
            this._toasterService.pop({
              type: 'warning',
              title: 'Cuidado',
              body: 'Filtros con errores',
              timeout: 1500,
              showCloseButton: true
            });
            this.parametrosSeleccionados.emit(false);
          }
        }
      );
  }

  escucharCampo(nombreCampo: string, arregloMensajesDeError: any[], objetoMensajesDeError: {}) {
    const campo$ = this.filtroFecha.get(nombreCampo);
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

  llenarFormulario() {
    if (this.parametrosDeBusqueda) {
      this.filtroFecha
        .setValue({
          fechaTaller: this.parametrosDeBusqueda.fechaTaller,
          horaInicio: this.parametrosDeBusqueda.horaInicio,
          horaFin: this.parametrosDeBusqueda.horaFin,
          etapa: this.parametrosDeBusqueda.etapa
        });
    }
  }


  enviarParametros() {
    // tslint:disable-next-line:no-unused-expression
    this.filtroFecha;
  }
}
