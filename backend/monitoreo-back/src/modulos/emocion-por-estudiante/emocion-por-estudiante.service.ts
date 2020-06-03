import { Injectable } from '@nestjs/common';
import { ClaseGenericaService } from '../../clases-genericas/clase-generica-component/clase-generica.service';
import { EmocionPorEstudianteEntity } from './emocion-por-estudiante.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EmocionPorEstudianteService extends ClaseGenericaService<EmocionPorEstudianteEntity> {

  constructor(
    @InjectRepository(EmocionPorEstudianteEntity)
    private readonly _emocionPorEstudianteRepository: Repository<EmocionPorEstudianteEntity>,
  ) {
    super(_emocionPorEstudianteRepository);
  }
}
