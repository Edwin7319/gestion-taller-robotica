import { IsInt, IsOptional } from 'class-validator';
import { TallerEntity } from '../../taller/taller.entity';
import { EstudianteEntity } from '../../estudiante/estudiante.entity';
import { EstudiantePorTallerEntity } from '../estudiante-por-taller.entity';

export class ActualizarEstudiantePorTallerDto {

  @IsOptional()
  @IsInt()
  taller: number | TallerEntity;

  @IsOptional()
  @IsInt()
  estudiante: number | EstudianteEntity;

  constructor(estudiantePorTaller: EstudiantePorTallerEntity) {
    this.taller = estudiantePorTaller.taller;
    this.estudiante = estudiantePorTaller.estudiante;
  }
}
