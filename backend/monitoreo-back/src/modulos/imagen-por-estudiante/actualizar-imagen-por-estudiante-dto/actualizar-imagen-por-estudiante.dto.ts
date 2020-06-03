import { IsInt, IsOptional } from 'class-validator';
import { EstudianteEntity } from '../../estudiante/estudiante.entity';
import { ImagenEntity } from '../../imagen/imagen.entity';
import { ImagenPorEstudianteEntity } from '../imagen-por-estudiante.entity';

export class ActualizarImagenPorEstudianteDto {

  @IsOptional()
  @IsInt()
  estudiante: number | EstudianteEntity;

  @IsOptional()
  @IsInt()
  imagen: number | ImagenEntity;

  constructor(imagenPorEstudiante: ImagenPorEstudianteEntity) {
    this.estudiante = imagenPorEstudiante.estudiante;
    this.imagen = imagenPorEstudiante.imagen;
  }

}
