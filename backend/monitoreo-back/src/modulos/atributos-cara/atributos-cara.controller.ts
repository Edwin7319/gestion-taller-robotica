import {Body, Controller, Get, HttpStatus, InternalServerErrorException, Post, Put, Res} from '@nestjs/common';
import {AtributosCaraService} from './atributos-cara.service';

@Controller('atributos-cara')
export class AtributosCaraController {

    constructor(
        private readonly _atributoService: AtributosCaraService,
    ) {
    }

    @Post()
    async guardar(
        @Body() datos,
    ) {
        try {
            const respuesta = await this._atributoService.crear(datos);
            return {
                status: 200,
                data: respuesta
            };
        } catch (errores) {
            throw new InternalServerErrorException({mensaje: 'Error guardar en mongo'});
        }
    }

    @Get()
    async listarTodos() {
        try {
            const respuesta = await this._atributoService.listarTodos();
            return {
                status: 200,
                data: respuesta
            };
        } catch (e) {
            throw new InternalServerErrorException({mensaje: 'No se pudo listar desde mongo'});
        }

    }

    @Put()
    async listarPorFecha(
        @Body() query: { fechaInicio: string, fechaFin: string, etapa: string , idTaller: string | number}
    ) {
        console.log(query)
        try {
            const respuesta = await this._atributoService.buscarEntreFechas(query.fechaInicio, query.fechaFin, query.etapa, +query.idTaller);
            return {
                status: 200,
                numeroAtributos: respuesta.length,
                data: respuesta
            };
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException(
                {
                    mensaje: 'Error al recibir.'
                }
            );
        }
    }

}
