import { Entity, ManyToOne } from 'typeorm';
import { ClaseGenericaEntity } from '../../clases-genericas/clase-generica-entity/clase-generica.entity';
import { EstudianteEntity } from '../estudiante/estudiante.entity';
import { EmocionEntity } from '../emocion/emocion.entity';

@Entity('emocion_por_estudiante')
export class EmocionPorEstudianteEntity extends ClaseGenericaEntity {

  @ManyToOne(
    type => EstudianteEntity,
    estudiante => estudiante.emocionesPorEstudiante,
    {
      onDelete: 'CASCADE',
    },
  )
  estudiante: EstudianteEntity | number;

  @ManyToOne(
    type => EmocionEntity,
    emocion => emocion.emocionesPorEstudiante,
  )
  emocion: EmocionEntity | number;

}
