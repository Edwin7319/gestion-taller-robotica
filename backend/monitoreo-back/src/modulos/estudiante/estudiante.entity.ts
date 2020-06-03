import { Column, Entity, Index, OneToMany } from 'typeorm';
import { ClaseGenericaEntity } from '../../clases-genericas/clase-generica-entity/clase-generica.entity';
import { EstudiantePorTallerEntity } from '../estudiante-por-taller/estudiante-por-taller.entity';
import { ImagenPorEstudianteEntity } from '../imagen-por-estudiante/imagen-por-estudiante.entity';
import { EmocionPorEstudianteEntity } from '../emocion-por-estudiante/emocion-por-estudiante.entity';

@Entity('estudiante')
@Index(['nombre', 'apellido'])
export class EstudianteEntity extends ClaseGenericaEntity {

  @Column({
    type: 'varchar',
    name: 'nombre',
    length: 20,
  })
  nombre: string = null;

  @Column({
    type: 'varchar',
    name: 'apellido',
    length: 20,
  })
  apellido: string = null;

  @Column({
    type: 'date',
    name: 'fecha_nacimiento',
  })
  fechaNacimiento: string = null;

  @Column({
    type: 'tinyint',
    name: 'habilitado',
    default: 1,
  })
  habilitado: 1 | 0 = 1;

  @OneToMany(
    type => EstudiantePorTallerEntity,
    estudiantePorTaller => estudiantePorTaller.estudiante,
  )
  estudiantesPorTaller: EstudiantePorTallerEntity[];

  @OneToMany(
    type => ImagenPorEstudianteEntity,
    imagenPorEstudiante => imagenPorEstudiante.estudiante,
  )
  imagenesPorEstudiante: ImagenPorEstudianteEntity[];

  @OneToMany(
    type => EmocionPorEstudianteEntity,
    emocionPorEstudiante => emocionPorEstudiante.estudiante,
  )
  emocionesPorEstudiante: EmocionPorEstudianteEntity[];
}
