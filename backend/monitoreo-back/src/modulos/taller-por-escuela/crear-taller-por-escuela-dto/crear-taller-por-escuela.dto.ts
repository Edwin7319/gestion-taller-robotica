import { IsIn, IsInt, IsNumber, IsOptional } from 'class-validator';
import { EscuelaEntity } from '../../escuela/escuela.entity';
import { TallerEntity } from '../../taller/taller.entity';
import { TallerPorEscuelaEntity } from '../taller-por-escuela.entity';

export class CrearTallerPorEscuelaDto {
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
