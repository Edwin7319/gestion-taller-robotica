import {Controller} from '@nestjs/common';
import {ClaseGenericaController} from '../../clases-genericas/clase-generica-component/clase-generica.controller';
import {RolPorUsuarioEntity} from './rol-por-usuario.entity';
import {CrearRolPorUsuarioDto} from './crear-rol-por-usuario-dto/crear-rol-por-usuario.dto';
import {ActualizarRolPorUsuarioDto} from './actualizar-rol-por-usuario-dto/actualizar-rol-por-usuario.dto';
import {RolPorUsuarioService} from './rol-por-usuario.service';

@Controller('rol-por-usuario')
export class RolPorUsuarioController extends ClaseGenericaController<RolPorUsuarioEntity> {

    CrearDTO = CrearRolPorUsuarioDto;
    ActualizarDTO = ActualizarRolPorUsuarioDto;

    constructor(
        private readonly _rolPorUsuarioService: RolPorUsuarioService
    ) {
        super(_rolPorUsuarioService);
    }
}
