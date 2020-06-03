import { IsNumber, IsOptional, IsString } from 'class-validator';
import { EmocionEntity } from '../emocion.entity';

export class ActualizarEmocionDto {
  @IsOptional()
  @IsString()
  descripcion: string;

  @IsOptional()
  @IsNumber()
  valor: number;

  constructor(emcoion: EmocionEntity) {
    this.descripcion = emcoion.descripcion;
    this.valor = emcoion.valor;
  }
}
