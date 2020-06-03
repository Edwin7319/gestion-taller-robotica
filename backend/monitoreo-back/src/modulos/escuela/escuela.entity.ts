import { Column, Entity, OneToMany } from 'typeorm';
import { TallerPorEscuelaEntity } from '../taller-por-escuela/taller-por-escuela.entity';
import { ClaseGenericaEntity } from '../../clases-genericas/clase-generica-entity/clase-generica.entity';

@Entity('escuela')
export class EscuelaEntity extends ClaseGenericaEntity {
  @Column({
    type: 'varchar',
    name: 'nombre_escuela',
    length: 255,
  })
  nombre: string = null;

  @Column({
    type: 'varchar',
    name: 'telefono_escuela',
    length: 15,
  })
  telefono: string = null;

  @Column({
    type: 'varchar',
    name: 'direccion',
    length: 255,
  })
  direccion: string = null;

  @Column({
    type: 'tinyint',
    name: 'habilitado',
    default: 1,
  })
  habilitado: 1 | 0 = 1;

  @OneToMany(
    type => TallerPorEscuelaEntity,
    tallerPorEscuela => tallerPorEscuela.escuela,
  )
  talleresPorEscuela: TallerPorEscuelaEntity[];
}
