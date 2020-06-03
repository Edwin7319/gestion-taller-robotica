import { Entity, ManyToOne } from 'typeorm';
import { ClaseGenericaEntity } from '../../clases-genericas/clase-generica-entity/clase-generica.entity';
import { TallerEntity } from '../taller/taller.entity';
import { EstudianteEntity } from '../estudiante/estudiante.entity';

@Entity('estudiante_por_taller')
export class EstudiantePorTallerEntity extends ClaseGenericaEntity {

  @ManyToOne(
    type => TallerEntity,
    taller => taller.estudiantesPorTaller,
    {
      onDelete: 'CASCADE',
    },
  )
  taller: TallerEntity | number;

  @ManyToOne(
    type => EstudianteEntity,
    estudiante => estudiante.estudiantesPorTaller,
    {
      onDelete: 'CASCADE',
    },
  )
  estudiante: EstudianteEntity | number;
}
