import {Injectable, EventEmitter} from '@angular/core';

@Injectable()
export class CargandoService {
  cargando = false;
  cambioCargando: EventEmitter<boolean> = new EventEmitter();

  habilitarCargando() {
    this.cargando = true;
    this.cambioCargando.emit(true);
  }

  deshabiltarCargando() {
    setTimeout(
      () => {
        this.cargando = false;
        this.cambioCargando.emit(false);
      }, 5000
    );
  }

}
