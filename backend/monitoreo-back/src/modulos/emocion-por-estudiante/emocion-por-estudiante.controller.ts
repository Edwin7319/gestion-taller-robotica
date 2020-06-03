import { Controller } from '@nestjs/common';
import { ClaseGenericaController } from '../../clases-genericas/clase-generica-component/clase-generica.controller';
import { EmocionPorEstudianteEntity } from './emocion-por-estudiante.entity';
import { ActualizarEmocionPorEstudianteDto } from './actualizar-emocion-por-estudiante-dto/actualizar-emocion-por-estudiante.dto';
import { CrearEmocionPorEstudianteDto } from './crear-emocion-por-estudiante-dto/crear-emocion-por-estudiante.dto';
import { EmocionPorEstudianteService } from './emocion-por-estudiante.service';

@Controller('emocion-por-estudiante')
export class EmocionPorEstudianteController extends ClaseGenericaController<EmocionPorEstudianteEntity> {

  CrearDTO = CrearEmocionPorEstudianteDto;
  ActualizarDTO = ActualizarEmocionPorEstudianteDto;

  constructor(
    private readonly _emocionPorEstudianteService: EmocionPorEstudianteService,
  ) {
    super(_emocionPorEstudianteService);
  }
}
