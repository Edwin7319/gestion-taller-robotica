import { Column, Entity, OneToMany } from 'typeorm';
import { ClaseGenericaEntity } from '../../clases-genericas/clase-generica-entity/clase-generica.entity';
import { TallerPorUsuarioEntity } from '../taller-por-usuario/taller-por-usuario.entity';
import { TallerPorEscuelaEntity } from '../taller-por-escuela/taller-por-escuela.entity';
import { EstudiantePorTallerEntity } from '../estudiante-por-taller/estudiante-por-taller.entity';

@Entity('taller')
export class TallerEntity extends ClaseGenericaEntity {

  @Column({
    type: 'varchar',
    name: 'descripcion',
    length: 255,
  })
  descripcion: string = null;

  @Column({
    type: 'date',
    name: 'fecha_taller',
  })
  fechaTaller: string = null;

  @Column({
    type: 'tinyint',
    name: 'habilitado',
    default: 1,
  })
  habilitado: 1 | 0 = 1;

  @OneToMany(
    type => TallerPorUsuarioEntity,
    tallerPorUsuario => tallerPorUsuario.taller,
  )
  talleresPorUsuario: TallerPorUsuarioEntity[];

  @OneToMany(
    type => TallerPorEscuelaEntity,
    tallerPorEscuela => tallerPorEscuela.taller,
  )
  talleresPorEscuela: TallerPorEscuelaEntity[];

  @OneToMany(
    type => EstudiantePorTallerEntity,
    estudiantePorTaller => estudiantePorTaller.taller,
  )
  estudiantesPorTaller: EstudiantePorTallerEntity[];
}
