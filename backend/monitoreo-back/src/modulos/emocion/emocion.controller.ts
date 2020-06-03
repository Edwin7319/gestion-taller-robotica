import { Controller } from '@nestjs/common';
import { ClaseGenericaController } from '../../clases-genericas/clase-generica-component/clase-generica.controller';
import { EmocionEntity } from './emocion.entity';
import { CrearEmocionDto } from './crear-emocion-dto/crear-emocion.dto';
import { ActualizarEmocionDto } from './actualizar-emocion-dto/actualizar-emocion.dto';
import { EmocionService } from './emocion.service';

@Controller('emocion')
export class EmocionController extends ClaseGenericaController<EmocionEntity> {

  CrearDTO = CrearEmocionDto;
  ActualizarDTO = ActualizarEmocionDto;

  constructor(
    private readonly _emocionService: EmocionService,
  ) {
    super(_emocionService);
  }
}
