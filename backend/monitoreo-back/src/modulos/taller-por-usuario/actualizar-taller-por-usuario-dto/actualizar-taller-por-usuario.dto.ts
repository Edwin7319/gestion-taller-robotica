import { IsInt, IsNumber, IsOptional } from 'class-validator';
import { UsuarioEntity } from '../../usuario/usuario.entity';
import { TallerEntity } from '../../taller/taller.entity';
import { TallerPorUsuarioEntity } from '../taller-por-usuario.entity';

export class ActualizarTallerPorUsuarioDto {

  @IsOptional()
  @IsInt()
  usuario: number | UsuarioEntity;

  @IsOptional()
  @IsInt()
  taller: number | TallerEntity;

  constructor(tallerPorUsuario: TallerPorUsuarioEntity) {
    this.usuario = tallerPorUsuario.usuario;
    this.taller = tallerPorUsuario.taller;
  }
}
