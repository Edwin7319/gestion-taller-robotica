import { Injectable } from '@nestjs/common';
import { ClaseGenericaService } from '../../clases-genericas/clase-generica-component/clase-generica.service';
import { EmocionEntity } from './emocion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EmocionService extends ClaseGenericaService<EmocionEntity> {

  constructor(
    @InjectRepository(EmocionEntity)
    private readonly _emocionRepository: Repository<EmocionEntity>,
  ) {
    super(_emocionRepository);
  }
}
