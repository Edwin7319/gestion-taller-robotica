import { Injectable } from '@nestjs/common';
import { ClaseGenericaService } from '../../clases-genericas/clase-generica-component/clase-generica.service';
import { EstudiantePorTallerEntity } from './estudiante-por-taller.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EstudiantePorTallerService extends ClaseGenericaService<EstudiantePorTallerEntity> {

  constructor(
    @InjectRepository(EstudiantePorTallerEntity)
    private readonly _estudiantePorTallerRepository: Repository<EstudiantePorTallerEntity>,
  ) {
    super(_estudiantePorTallerRepository);
  }

  async obtnerEstudiantesPorTaller(idTaller: number, skip: number, take: number): Promise<any> {
    const consulta = await this._estudiantePorTallerRepository
      .createQueryBuilder('estudiantePorTaller')
      .innerJoinAndSelect(
        'estudiantePorTaller.estudiante',
        'estudiante',
        'estudiante.id = estudiantePorTaller.estudiante')
      // .innerJoinAndSelect(
      //   'estudiantePorTaller.taller',
      //   'taller',
      //   'taller.id = estudiantePorTaller.taller')
      .where(
        'estudiantePorTaller.taller = :idT',
        { idT: idTaller })
      .skip(skip)
      .take(take)
      .orderBy('estudiantePorTaller.id', 'DESC')
      .getManyAndCount();

    return consulta;
  }
}
