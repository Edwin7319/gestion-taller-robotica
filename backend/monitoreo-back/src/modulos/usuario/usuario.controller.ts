import {BadRequestException, Body, Controller, Get, InternalServerErrorException, Post, Query} from '@nestjs/common';
import {ClaseGenericaController} from '../../clases-genericas/clase-generica-component/clase-generica.controller';
import {UsuarioEntity} from './usuario.entity';
import {CrearUsuarioDto} from './crear-usuario-dto/crear-usuario.dto';
import {ActualizarUsuarioDto} from './actualizar-usuario-dto/actualizar-usuario.dto';
import {UsuarioService} from './usuario.service';
import {validate} from 'class-validator';
import {genSalt, hash} from 'bcryptjs';
import {ParametroPaginacionInterface} from '../../interfaces/parametro-paginacion.interface';
import {publicDecrypt} from 'crypto';

@Controller('usuario')
export class UsuarioController extends ClaseGenericaController<UsuarioEntity> {

    CrearDTO = CrearUsuarioDto;
    ActualizarDTO = ActualizarUsuarioDto;

    constructor(
        private readonly _usuarioService: UsuarioService
    ) {
        super(_usuarioService);
    }

    @Post('crear')
    async crearUsuario(
        @Body() datos: UsuarioEntity
    ) {
        const usuarioNuevo = new CrearUsuarioDto(datos);
        const errores = await validate(usuarioNuevo);
        const existenErrores = errores.length > 0;
        if (!existenErrores) {
            try {
                const salt = await genSalt(10);
                datos.password = await hash(usuarioNuevo.password, salt);
                const respuesta = await this._usuarioService.crear(
                    datos
                );
                return respuesta;
            } catch (e) {
                console.log(e);
                throw new InternalServerErrorException({mensaje: 'Error de '});
            }
        } else {
            console.log(errores);
            throw new BadRequestException({mensaje: 'Error parametros'});
        }
    }

    @Post('buscar-usuario')
    async encontrarPorNombreOApellido(
        @Query() parametro,
    ) {
        try {
            const respuesta = await this._usuarioService.encontrarPorNombre(parametro.nombre);
            return respuesta;
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }

    @Get('listar/autenticado')
    async listarAutenticado(
        @Query() parametros: ParametroPaginacionInterface
    ) {
        try {
            const respuesta = await this._usuarioService.listarTodos(+parametros.skip, +parametros.take);
            const arregloUsuario: any = respuesta[0];
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException({mensaje: 'Error de parametros'});
        }
    }

}
