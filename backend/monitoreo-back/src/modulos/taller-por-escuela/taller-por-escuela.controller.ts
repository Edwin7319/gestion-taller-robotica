import { Controller } from '@nestjs/common';
import { ClaseGenericaController } from '../../clases-genericas/clase-generica-component/clase-generica.controller';
import { TallerPorEscuelaEntity } from './taller-por-escuela.entity';
import { CrearTallerPorEscuelaDto } from './crear-taller-por-escuela-dto/crear-taller-por-escuela.dto';
import { ActualizarTallerPorEscuelaDto } from './actualizar-taller-por-escuela-dto/actualizar-taller-por-escuela.dto';
import { TallerPorEscuelaService } from './taller-por-escuela.service';

@Controller('taller-por-escuela')
export class TallerPorEscuelaController extends ClaseGenericaController<TallerPorEscuelaEntity> {

  CrearDTO = CrearTallerPorEscuelaDto;
  ActualizarDTO = ActualizarTallerPorEscuelaDto;

  constructor(
    private readonly _tallerPorEscuelaService: TallerPorEscuelaService,
  ) {
    super(_tallerPorEscuelaService);
  }
}
