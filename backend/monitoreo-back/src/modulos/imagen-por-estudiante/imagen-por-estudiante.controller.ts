import { Controller, Get, InternalServerErrorException, Param, Query } from '@nestjs/common';
import { ClaseGenericaController } from '../../clases-genericas/clase-generica-component/clase-generica.controller';
import { ImagenPorEstudianteEntity } from './imagen-por-estudiante.entity';
import { CrearImagenPorEstudianteDto } from './crear-imagen-por-estudiante-dto/crear-imagen-por-estudiante.dto';
import { ActualizarImagenPorEstudianteDto } from './actualizar-imagen-por-estudiante-dto/actualizar-imagen-por-estudiante.dto';
import { ImagenPorEstudianteService } from './imagen-por-estudiante.service';
import { ParametroPaginacionInterface } from '../../interfaces/parametro-paginacion.interface';

@Controller('imagen-por-estudiante')
export class ImagenPorEstudianteController extends ClaseGenericaController<ImagenPorEstudianteEntity> {

  CrearDTO = CrearImagenPorEstudianteDto;
  ActualizarDTO = ActualizarImagenPorEstudianteDto;

  constructor(
    private readonly _imagenPorEstudianteService: ImagenPorEstudianteService,
  ) {
    super(_imagenPorEstudianteService);
  }

  @Get('listar/:idEstudiante')
  async obtnerEstudiantesPorTaller(
    @Param('idEstudiante') idEstudiante: number,
    @Query() parametros: ParametroPaginacionInterface,
  ) {
    parametros.skip = +parametros.skip;
    parametros.take = +parametros.take;
    try {
      const respuesta = await this._imagenPorEstudianteService.obtnerImagenPorEstudiante(idEstudiante, parametros.skip, parametros.take);
      return {
        data: respuesta[0],
        cantidad: respuesta[1]
      };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
