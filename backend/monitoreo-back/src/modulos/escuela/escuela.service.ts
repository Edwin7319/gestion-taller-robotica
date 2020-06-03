import { Injectable } from '@nestjs/common';
import { ClaseGenericaService } from '../../clases-genericas/clase-generica-component/clase-generica.service';
import { EscuelaEntity } from './escuela.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EscuelaService extends ClaseGenericaService<EscuelaEntity> {

  constructor(
    @InjectRepository(EscuelaEntity)
    private readonly _escuelaRepository: Repository<EscuelaEntity>,
  ) {
    super(_escuelaRepository);
  }
}
