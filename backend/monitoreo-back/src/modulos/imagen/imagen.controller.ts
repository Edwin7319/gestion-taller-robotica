import { Controller } from '@nestjs/common';
import { ClaseGenericaController } from '../../clases-genericas/clase-generica-component/clase-generica.controller';
import { ImagenEntity } from './imagen.entity';
import { CrearImagenDto } from './crear-imagen-dto/crear-imagen.dto';
import { ActualizarImagenDto } from './actualizar-imagen-dto/actualizar-imagen.dto';
import { ImagenService } from './imagen.service';

@Controller('imagen')
export class ImagenController extends ClaseGenericaController<ImagenEntity> {

  CrearDTO = CrearImagenDto;
  ActualizarDTO = ActualizarImagenDto;

  constructor(
    private readonly _imagenService: ImagenService,
  ) {
    super(_imagenService);
  }
}
