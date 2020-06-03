import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway({ namespace: 'monitoreo' })
export class ServicioGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor() {

  }

  afterInit(server: any): any {
    console.log('Websocket ha iniciado');
  }

  handleConnection(cliente: any, ...args: any[]): any {
    console.log(`Ha iniciado seción ${cliente.id}`);
    // this.datosEmitidos.pop();
  }

  handleDisconnect(cliente: any): any {
    console.log(`Ha cerrado seción ${cliente.id}`);
    // this.datosEmitidos.pop();
  }

  @SubscribeMessage('unirseAMonitoreo')
  unirseAMonitoreo(
    socketCliente,
    datos: { nombreSala: string },
  ) {
    socketCliente.join(
      'sala' + datos.nombreSala.toString(),
    );
    return {
      mensaje: `Se ha unido a la sala ${datos.nombreSala}`,
    };
  }

  // @SubscribeMessage('obtnerDatoPorSala')
  // obtenerDatoPorSala(
  //     socketCliente,
  //     datos: { nombreSala: string }) {
  //     const horarios = [
  //         {
  //             id: 1,
  //             dia: 'lunes'
  //         },
  //         {
  //             id: 2,
  //             dia: 'martes'
  //         },
  //         {
  //             id: 3,
  //             dia: 'miercoles'
  //         },
  //         {
  //             id: 4,
  //             dia: 'jueves'
  //         },
  //     ];

  //     return horarios.filter(
  //         (dia) => {
  //             switch (datos.nombreSala) {
  //                 case 'mlab':
  //                     if (dia.dia === 'lunes') {
  //                         return true;
  //                     }
  //                 case 'web':
  //                     if (dia.dia === 'martes') {
  //                         return true;
  //                     }
  //                 case 'epn':
  //                     if (dia.dia === 'miercoles') {
  //                         return true;
  //                     }
  //                 case 'cec':
  //                     if (dia.dia === 'jueves') {
  //                         return true;
  //                     }
  //                 default:
  //                     return false;
  //             }
  //         });
  // }

  @SubscribeMessage('enviarDatoAServidor')
  enviarDato(
    socketCliente,
    datos: { nombreSala: string, emociones: any },
  ) {
    console.log(datos);
    socketCliente
      .to('sala' + datos.nombreSala)
      .emit('seEmitioDato',
        datos,
      );

    return datos;
  }

  @SubscribeMessage('dejarSala')
  dejarSala(
    socketCliente,
    datos: { nombreSala: string },
  ) {
    socketCliente.leave(
      'sala' + datos.nombreSala.toString(),
    );

    return { mensaje: `Abamdono dala ${datos.nombreSala}` };
  }
}
