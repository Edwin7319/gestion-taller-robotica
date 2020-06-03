import { Column, Entity, OneToMany } from 'typeorm';
import { ClaseGenericaEntity } from '../../clases-genericas/clase-generica-entity/clase-generica.entity';
import { EmocionPorEstudianteEntity } from '../emocion-por-estudiante/emocion-por-estudiante.entity';

@Entity('emocion')
export class EmocionEntity extends ClaseGenericaEntity {

  @Column({
    type: 'varchar',
    name: 'descripcion',
    length: 255,
  })
  descripcion: string = null;

  @Column({
    type: 'decimal',
    name: 'valor',
    precision: 4,
    scale: 4,
  })
  valor: number = null;

  @OneToMany(
    type => EmocionPorEstudianteEntity,
    emocionPorEstudiante => emocionPorEstudiante.emocion,
  )
  emocionesPorEstudiante: EmocionPorEstudianteEntity[];

}
