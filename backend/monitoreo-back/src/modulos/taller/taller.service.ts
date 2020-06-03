import { Injectable } from '@nestjs/common';
import { ClaseGenericaService } from '../../clases-genericas/clase-generica-component/clase-generica.service';
import { TallerEntity } from './taller.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TallerService extends ClaseGenericaService<TallerEntity> {

  constructor(
    @InjectRepository(TallerEntity)
    private readonly _tallerRepository: Repository<TallerEntity>,
  ) {
    super(_tallerRepository);
  }
}
