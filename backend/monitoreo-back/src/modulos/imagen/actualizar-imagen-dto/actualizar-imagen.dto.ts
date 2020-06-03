import { IsOptional, IsString } from 'class-validator';
import { ImagenEntity } from '../imagen.entity';

export class ActualizarImagenDto {
  @IsOptional()
  @IsString()
  url: string;

  constructor(imagen: ImagenEntity) {
    this.url = imagen.url;
  }
}
