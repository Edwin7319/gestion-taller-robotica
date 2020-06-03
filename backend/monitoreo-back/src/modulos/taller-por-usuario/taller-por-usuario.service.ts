import { Injectable } from '@nestjs/common';
import { ClaseGenericaService } from '../../clases-genericas/clase-generica-component/clase-generica.service';
import { TallerPorUsuarioEntity } from './taller-por-usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TallerPorUsuarioService extends ClaseGenericaService <TallerPorUsuarioEntity> {

  constructor(
    @InjectRepository(TallerPorUsuarioEntity)
    private readonly _tallerPorUsuarioRepository: Repository<TallerPorUsuarioEntity>,
  ) {
    super(_tallerPorUsuarioRepository);
  }
}
