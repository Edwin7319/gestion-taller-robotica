import { Injectable } from '@nestjs/common';
import { ClaseGenericaService } from '../../clases-genericas/clase-generica-component/clase-generica.service';
import { TallerPorEscuelaEntity } from './taller-por-escuela.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TallerPorEscuelaService extends ClaseGenericaService<TallerPorEscuelaEntity> {

  constructor(
    @InjectRepository(TallerPorEscuelaEntity)
    private readonly _tallerPorEscuelaRepository: Repository<TallerPorEscuelaEntity>,
  ) {
    super(_tallerPorEscuelaRepository);
  }
}
