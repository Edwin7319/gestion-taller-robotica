import { IsDate, IsInt, IsOptional, IsString, Length } from 'class-validator';
import { TallerEntity } from '../taller.entity';

export class ActualizarTallerDto {

  @IsOptional()
  @Length(3, 255)
  @IsString()
  descripcion: string;

  @IsOptional()
  @IsDate()
  fechaTaller: Date;

  @IsOptional()
  @IsInt()
  habilitado?: 1 | 0;

  constructor(taller: TallerEntity) {
    this.descripcion = taller.descripcion;
    // this.fechaTaller = new Date(taller.fechaTaller);

  }
}
