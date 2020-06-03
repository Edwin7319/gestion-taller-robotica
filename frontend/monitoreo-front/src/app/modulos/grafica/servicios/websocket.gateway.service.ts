import {EventEmitter, Injectable} from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class WebsocketGatewayService {

  readonly URL = 'http://localhost:3000/monitoreo';
  servidorSocket;
  conectado = false;
  eventoSeConecto: EventEmitter<any> = new EventEmitter<any>();
  eventoSeDesconecto: EventEmitter<any> = new EventEmitter<any>();
  eventoDatoRecibido: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.iniciarConexion();
  }

  iniciarConexion() {
    this.servidorSocket = io(this.URL);

    this.servidorSocket.on('connect', () => {
      this.conectado = true;
      this.eventoSeConecto.emit(this.conectado);
    });

    this.servidorSocket.on('disconnect', () => {
      this.conectado = false;
      this.eventoSeDesconecto.emit(this.conectado);
    });

    this.servidorSocket.on('seEmitioDato', (datos) => {
      this.eventoDatoRecibido.emit(datos.datos);
    });
  }

  unirseAMonitoreo(nombreSala: string): Promise<{
    mensaje: string,
  }> {
    return new Promise(
      (resolve, reject) => {
        this.servidorSocket
          .emit(
            'unirseAMonitoreo',
            {nombreSala},
            (respuesta: { mensaje: string}) => {
              resolve(respuesta);
            });
      });
  }

  dejarMonitoreo(nombreSala: string): Promise<{ mensaje: string }> {
    return new Promise(
      (resolve, reject) => {
        this.servidorSocket
          .emit(
            'dejarSala',
            {nombreSala},
            (respuesta: { mensaje: string }) => {
              resolve(respuesta);
            });
      });
  }

  obtnerDatoPorSala(nombreSala: string): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.servidorSocket
          .emit(
            'obtnerDatoPorSala',
            {nombreSala},
            (respuesta) => {
              resolve(respuesta);
            });
      }
    );
  }

  enviarDato(nombreSala: string, datos: any): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.servidorSocket
          .emit(
            'enviarDatoAServidor',
            {nombreSala, datos},
            (respuesta) => {
              resolve(respuesta);
            });
      }
    );
  }
}
