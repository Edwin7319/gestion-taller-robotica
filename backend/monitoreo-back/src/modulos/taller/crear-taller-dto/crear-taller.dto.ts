import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { TallerEntity } from '../taller.entity';

export class CrearTallerDto {

  @IsNotEmpty()
  @Length(3, 255)
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsDate()
  fechaTaller: Date;

  @IsOptional()
  @IsInt()
  habilitado?: 1 | 0;

  constructor(taller: TallerEntity) {
    this.descripcion = taller.descripcion;
    this.fechaTaller = new Date(taller.fechaTaller);
  }
}
