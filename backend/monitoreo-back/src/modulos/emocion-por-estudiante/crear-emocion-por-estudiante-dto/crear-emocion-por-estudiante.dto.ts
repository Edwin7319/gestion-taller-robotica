import { IsInt, IsOptional } from 'class-validator';
import { EmocionPorEstudianteEntity } from '../emocion-por-estudiante.entity';
import { EstudianteEntity } from '../../estudiante/estudiante.entity';
import { EmocionEntity } from '../../emocion/emocion.entity';

export class CrearEmocionPorEstudianteDto {
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
