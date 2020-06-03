import { Entity, ManyToOne } from 'typeorm';
import { ClaseGenericaEntity } from '../../clases-genericas/clase-generica-entity/clase-generica.entity';
import { ImagenEntity } from '../imagen/imagen.entity';
import { EstudianteEntity } from '../estudiante/estudiante.entity';

@Entity('imagen_por_estudiante')
export class ImagenPorEstudianteEntity extends ClaseGenericaEntity {

  @ManyToOne(
    type => ImagenEntity,
    imagen => imagen.imagenesPorEstudiante,
    {
      onDelete: 'CASCADE',
    },
  )
  imagen: ImagenEntity | number;

  @ManyToOne(
    type => EstudianteEntity,
    estudiante => estudiante.imagenesPorEstudiante,
    {
      onDelete: 'CASCADE',
    },
  )
  estudiante: EstudianteEntity | number;
}
