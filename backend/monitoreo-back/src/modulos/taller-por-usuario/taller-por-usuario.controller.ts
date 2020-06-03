import { Controller } from '@nestjs/common';
import { ClaseGenericaController } from '../../clases-genericas/clase-generica-component/clase-generica.controller';
import { TallerPorUsuarioEntity } from './taller-por-usuario.entity';
import { TallerPorUsuarioService } from './taller-por-usuario.service';
import { CrearTallerPorUsuarioDto } from './crear-taller-por-usuario-dto/crear-taller-por-usuario.dto';
import { ActualizarTallerPorUsuarioDto } from './actualizar-taller-por-usuario-dto/actualizar-taller-por-usuario.dto';

@Controller('taller-por-usuario')
export class TallerPorUsuarioController extends ClaseGenericaController<TallerPorUsuarioEntity> {

  CrearDTO = CrearTallerPorUsuarioDto;
  ActualizarDTO = ActualizarTallerPorUsuarioDto;

  constructor(
    private readonly _tallerPorUsuarioService: TallerPorUsuarioService,
  ) {
    super(_tallerPorUsuarioService);
  }
}
