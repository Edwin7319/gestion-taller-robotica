import { Column, Entity, OneToMany } from 'typeorm';
import { ClaseGenericaEntity } from '../../clases-genericas/clase-generica-entity/clase-generica.entity';
import { ImagenPorEstudianteEntity } from '../imagen-por-estudiante/imagen-por-estudiante.entity';

@Entity('imagen')
export class ImagenEntity extends ClaseGenericaEntity {

   @Column({
       type: 'varchar',
       name: 'url',
       length: 255,
     })
     url: string = null;

   @OneToMany(
     type => ImagenPorEstudianteEntity,
     imagenPorEstudiante => imagenPorEstudiante.imagen
   )
  imagenesPorEstudiante: ImagenPorEstudianteEntity[];
}
