import { Injectable } from '@nestjs/common';
import { ClaseGenericaService } from '../../clases-genericas/clase-generica-component/clase-generica.service';
import { ImagenPorEstudianteEntity } from './imagen-por-estudiante.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ImagenPorEstudianteService extends ClaseGenericaService<ImagenPorEstudianteEntity> {

  constructor(
    @InjectRepository(ImagenPorEstudianteEntity)
    private readonly _imagenPorEstudianteRepository: Repository<ImagenPorEstudianteEntity>,
  ) {
    super(_imagenPorEstudianteRepository);
  }

  async obtnerImagenPorEstudiante(idEstudiante: number, skip: number, take: number): Promise<any> {
    const consulta = await this._imagenPorEstudianteRepository
      .createQueryBuilder('imagenPorEstudiante')
      .innerJoinAndSelect(
        'imagenPorEstudiante.imagen',
        'estudiante',
        'estudiante.id = imagenPorEstudiante.imagen')
      // .innerJoinAndSelect(
      //   'imagenPorEstudiante.taller',
      //   'taller',
      //   'taller.id = imagenPorEstudiante.taller')
      .where(
        'imagenPorEstudiante.estudiante = :idE',
        { idE: idEstudiante })
      .skip(skip)
      .take(take)
      .orderBy('imagenPorEstudiante.id', 'DESC')
      .getManyAndCount();

    return consulta;
  }
}
