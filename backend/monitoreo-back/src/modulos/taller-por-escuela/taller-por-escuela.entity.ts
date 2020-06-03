import { Entity, ManyToOne } from 'typeorm';
import { TallerEntity } from '../taller/taller.entity';
import { ClaseGenericaEntity } from '../../clases-genericas/clase-generica-entity/clase-generica.entity';
import { EscuelaEntity } from '../escuela/escuela.entity';

@Entity('taller_por_escuela')
export class TallerPorEscuelaEntity extends ClaseGenericaEntity {

  @ManyToOne(
    type => TallerEntity,
    taller => taller.talleresPorEscuela,
    {
      onDelete: 'CASCADE',
    },
  )
  taller: TallerEntity | number;

  @ManyToOne(
    type => EscuelaEntity,
    escuela => escuela.talleresPorEscuela,
    {
      onDelete: 'CASCADE',
    },
  )
  escuela: EscuelaEntity | number;

}
