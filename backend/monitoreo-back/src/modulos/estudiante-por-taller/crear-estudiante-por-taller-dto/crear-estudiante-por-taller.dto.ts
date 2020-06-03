import { IsInt, IsOptional } from 'class-validator';
import { EstudiantePorTallerEntity } from '../estudiante-por-taller.entity';
import { TallerEntity } from '../../taller/taller.entity';
import { EstudianteEntity } from '../../estudiante/estudiante.entity';

export class CrearEstudiantePorTallerDto {
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
