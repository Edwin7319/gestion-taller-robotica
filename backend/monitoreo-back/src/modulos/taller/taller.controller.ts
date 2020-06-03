import { Controller } from '@nestjs/common';
import { ClaseGenericaController } from '../../clases-genericas/clase-generica-component/clase-generica.controller';
import { TallerEntity } from './taller.entity';
import { CrearTallerDto } from './crear-taller-dto/crear-taller.dto';
import { ActualizarTallerDto } from './actualizar-taller-dto/actualizar-taller.dto';
import { TallerService } from './taller.service';

@Controller('taller')
export class TallerController extends ClaseGenericaController<TallerEntity> {

  CrearDTO = CrearTallerDto;
  ActualizarDTO = ActualizarTallerDto;

  constructor(
    private readonly _tallerService: TallerService,
  ) {
    super(_tallerService);
  }
}
