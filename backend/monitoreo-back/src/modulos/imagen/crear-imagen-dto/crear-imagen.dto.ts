import { IsOptional, IsString } from 'class-validator';
import { ImagenEntity } from '../imagen.entity';

export class CrearImagenDto {
  @IsOptional()
  @IsString()
  url: string;

  constructor(imagen: ImagenEntity) {
    this.url = imagen.url;
  }
}
