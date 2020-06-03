import { IsInt, IsNumberString, IsOptional, IsString } from 'class-validator';
import { EscuelaEntity } from '../escuela.entity';

export class ActualizarEscuelaDto {

  @IsOptional()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsNumberString()
  telefono: string;

  @IsOptional()
  @IsString()
  direccion: string;

  @IsOptional()
  @IsInt()
  habilitado: number;

  constructor(escuela: EscuelaEntity) {
    this.nombre = escuela.nombre;
    this.direccion = escuela.direccion;
    this.telefono = escuela.telefono;
  }
}
