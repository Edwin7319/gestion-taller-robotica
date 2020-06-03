import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { EmocionEntity } from '../emocion.entity';

export class CrearEmocionDto {
  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsNumber()
  valor: number;

  constructor(emcoion: EmocionEntity) {
    this.descripcion = emcoion.descripcion;
    this.valor = emcoion.valor;
  }
}
