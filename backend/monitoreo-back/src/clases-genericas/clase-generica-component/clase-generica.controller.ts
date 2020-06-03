import {BadRequestException, Body, Controller, Delete, Get, InternalServerErrorException, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {ClaseGenericaService} from './clase-generica.service';
import {validate} from 'class-validator';
import {ParametroPaginacionInterface} from '../../interfaces/parametro-paginacion.interface';
import {AuthGuard} from '@nestjs/passport';

@Controller()
export class ClaseGenericaController<Entity> {

    CrearDTO: any;
    ActualizarDTO: any;

    constructor(
        private readonly _claseGenericaService: ClaseGenericaService<Entity>
    ) {
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async crear(
        @Body() datos: Entity
    ) {
        const datosNuevos = new this.CrearDTO(datos);
        const errores = await validate(datosNuevos);
        const existeErrores = errores.length > 0;
        if (!existeErrores) {
            try {
                const respuesta: any = await this._claseGenericaService.crear(datos);
                return {
                    data: respuesta,
                    id: respuesta.id
                };
            } catch (e) {
                throw new InternalServerErrorException({mensaje: 'Error servidor', tipo: e});
            }
        } else {
            throw new BadRequestException({mensaje: 'Error usuario', tipo: errores});
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async actualizar(
        @Param('id') id: number,
        @Body() datos: Entity
    ) {
        console.log(datos)
        const datosAActualizar = new this.ActualizarDTO(datos);
        const errores = await validate(datosAActualizar);
        const existeErrores = errores.length > 0;
        if (!existeErrores) {
            try {
                const respuesta = await this._claseGenericaService.actualizar(id, datos);
                return respuesta;
            } catch (e) {
                throw new InternalServerErrorException({mensaje: 'Error servidor', tipo: 500});
            }
        } else {
            console.log(errores);
            throw new BadRequestException({mensaje: 'Error usuario', tipo: 500});
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async listarTodo(
        @Query() parametros: ParametroPaginacionInterface
    ) {
        parametros.skip = Number(parametros.skip);
        parametros.take = Number(parametros.take);
        try {
            const respuesta = await this._claseGenericaService.listarTodos(parametros.skip, parametros.take);
            return {
                data: respuesta[0],
                cantidad: respuesta[1]
            };
        } catch (e) {
            throw new InternalServerErrorException({mensaje: 'Error servidor', tipo: 500});
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    async listarPorId(
        @Param('id') id: number
    ) {
        try {
            const respuesta = await this._claseGenericaService.listarPorId(id);
            return respuesta;
        } catch (e) {
            throw new InternalServerErrorException({mensaje: 'No existe resultados', tipo: 500});
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async eliminar(
        @Param('id') id: number
    ) {
        try {
            return await this._claseGenericaService.eliminar(id);
        } catch (e) {
            throw new InternalServerErrorException({mensaje: 'Error servidor', tipo: 500});
        }
    }
}
