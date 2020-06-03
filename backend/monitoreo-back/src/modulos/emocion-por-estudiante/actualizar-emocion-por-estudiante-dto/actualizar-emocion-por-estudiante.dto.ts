import { IsInt, IsOptional } from 'class-validator';
import { EstudianteEntity } from '../../estudiante/estudiante.entity';
import { EmocionPorEstudianteEntity } from '../emocion-por-estudiante.entity';
import { EmocionEntity } from '../../emocion/emocion.entity';

export class ActualizarEmocionPorEstudianteDto {
  @IsOptional()
  @IsInt()
  estudiante: number | EstudianteEntity;

  @IsOptional()
  @IsInt()
  emocion: number | EmocionEntity;

  constructor(emocionPorEstudiante: EmocionPorEstudianteEntity) {
    this.estudiante = emocionPorEstudiante.estudiante;
    this.emocion = emocionPorEstudiante.emocion;
  }
}
