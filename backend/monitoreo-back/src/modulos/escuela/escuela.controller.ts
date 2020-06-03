import { Controller } from '@nestjs/common';
import { ClaseGenericaController } from '../../clases-genericas/clase-generica-component/clase-generica.controller';
import { EscuelaEntity } from './escuela.entity';
import { CrearEscuelaDto } from './crear-escuela-dto/crear-escuela.dto';
import { ActualizarEscuelaDto } from './actualizar-escuela-dto/actualizar-escuela.dto';
import { EscuelaService } from './escuela.service';

@Controller('escuela')
export class EscuelaController extends ClaseGenericaController<EscuelaEntity> {

  CrearDTO = CrearEscuelaDto;
  ActualizarDTO = ActualizarEscuelaDto;

  constructor(
    private readonly _escuelaService: EscuelaService,
  ) {
    super(_escuelaService);
  }
}
