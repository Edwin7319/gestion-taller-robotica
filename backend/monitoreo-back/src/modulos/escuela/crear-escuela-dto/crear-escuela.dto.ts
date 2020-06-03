import { IsInt, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';
import { EscuelaEntity } from '../escuela.entity';

export class CrearEscuelaDto {

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsNumberString()
  telefono: string;

  @IsNotEmpty()
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
