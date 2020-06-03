import { Injectable } from '@nestjs/common';
import { ClaseGenericaService } from '../../clases-genericas/clase-generica-component/clase-generica.service';
import { ImagenEntity } from './imagen.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ImagenService extends ClaseGenericaService<ImagenEntity> {

  constructor(
    @InjectRepository(ImagenEntity)
    private readonly _imagenRepository: Repository<ImagenEntity>,
  ) {
    super(_imagenRepository);
  }
}
