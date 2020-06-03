import {Body, Controller, Get, InternalServerErrorException, Param, Post, Query} from '@nestjs/common';
import {ClaseGenericaController} from '../../clases-genericas/clase-generica-component/clase-generica.controller';
import {EstudianteEntity} from './estudiante.entity';
import {EstudianteService} from './estudiante.service';
import {CrearEstudianteDto} from './crear-estudiante-dto/crear-estudiante.dto';
import {ActualizarEstudianteDto} from './actualizar-estudiante-dto/actualizar-estudiante.dto';
import {ParametroPaginacionInterface} from '../../interfaces/parametro-paginacion.interface';

@Controller('estudiante')
export class EstudianteController extends ClaseGenericaController<EstudianteEntity> {

    CrearDTO = CrearEstudianteDto;
    ActualizarDTO = ActualizarEstudianteDto;

    constructor(
        private readonly _estudianteService: EstudianteService,
    ) {
        super(_estudianteService);
    }

    @Post('buscar-estudiante')
    async encontrarPorNombreOApellido(
        @Query() parametro,
    ) {
        try {
            const respuesta = await this._estudianteService.encontrarPorNombreOApellido(parametro.nombre);
            return respuesta;
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }

    @Get('listar/estudiantes-disponibles')
    async estudiantesDisponibles(
        @Query() parametros: ParametroPaginacionInterface
    ) {
        parametros.skip = Number(parametros.skip);
        parametros.take = Number(parametros.take);
        try {
            const respuesta = await this._estudianteService.listarEstudiantesDisponibles(parametros.skip, parametros.take);
            return {
              data: respuesta[0],
              cantidad: respuesta[1]
            };
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }
}
