import { Body, Controller, Get, InternalServerErrorException, Param, Query } from '@nestjs/common';
import { ClaseGenericaController } from '../../clases-genericas/clase-generica-component/clase-generica.controller';
import { EstudiantePorTallerEntity } from './estudiante-por-taller.entity';
import { CrearEstudiantePorTallerDto } from './crear-estudiante-por-taller-dto/crear-estudiante-por-taller.dto';
import { ActualizarEstudiantePorTallerDto } from './actualizar-estudiante-por-taller-dto/actualizar-estudiante-por-taller.dto';
import { EstudiantePorTallerService } from './estudiante-por-taller.service';
import { ParametroPaginacionInterface } from '../../interfaces/parametro-paginacion.interface';

@Controller('estudiante-por-taller')
export class EstudiantePorTallerController extends ClaseGenericaController<EstudiantePorTallerEntity> {

  CrearDTO = CrearEstudiantePorTallerDto;
  ActualizarDTO = ActualizarEstudiantePorTallerDto;

  constructor(
    private readonly _estudiantePorTallerService: EstudiantePorTallerService,
  ) {
    super(_estudiantePorTallerService);
  }

  @Get('listar/:idTaller')
  async obtnerEstudiantesPorTaller(
    @Param('idTaller') idTaller: number,
    @Query() parametros: ParametroPaginacionInterface,
  ) {
    parametros.skip = +parametros.skip;
    parametros.take = +parametros.take;
    try {
      const respuesta = await this._estudiantePorTallerService.obtnerEstudiantesPorTaller(idTaller, parametros.skip, parametros.take);
      return {
        data: respuesta[0],
        cantidad: respuesta[1]
      };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
