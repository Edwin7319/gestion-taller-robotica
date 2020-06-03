import { IsInt, IsOptional } from 'class-validator';
import { TallerEntity } from '../../taller/taller.entity';
import { UsuarioEntity } from '../../usuario/usuario.entity';
import { TallerPorUsuarioEntity } from '../taller-por-usuario.entity';

export class CrearTallerPorUsuarioDto {

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
