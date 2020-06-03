import {Controller} from '@nestjs/common';
import {ClaseGenericaController} from '../../clases-genericas/clase-generica-component/clase-generica.controller';
import {RolEntity} from './rol.entity';
import {RolService} from './rol.service';
import {CrearRolDto} from './crear-rol-dto/crear-rol.dto';
import {ActualizarRolDto} from './actualizar-rol-dto/actualizar-rol.dto';

@Controller('rol')
export class RolController extends ClaseGenericaController<RolEntity> {

    CrearDTO = CrearRolDto;
    ActualizarDTO = ActualizarRolDto;

    constructor(
        private readonly _rolService: RolService
    ) {
        super(_rolService);
    }
}
