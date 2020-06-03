import { IsInt, IsOptional } from 'class-validator';
import { TallerEntity } from '../../taller/taller.entity';
import { EscuelaEntity } from '../../escuela/escuela.entity';
import { TallerPorEscuelaEntity } from '../taller-por-escuela.entity';

export class ActualizarTallerPorEscuelaDto {
  @IsOptional()
  @IsInt()
  taller: number | TallerEntity;

  @IsOptional()
  @IsInt()
  escuela: number | EscuelaEntity;

  constructor(tallerPorEscuela: TallerPorEscuelaEntity) {
    this.taller = tallerPorEscuela.taller;
    this.escuela = tallerPorEscuela.escuela;
  }
}
