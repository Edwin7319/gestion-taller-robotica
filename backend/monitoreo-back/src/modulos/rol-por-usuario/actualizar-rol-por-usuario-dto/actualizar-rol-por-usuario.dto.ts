import {IsInt, IsNotEmpty} from 'class-validator';
import {RolEntity} from '../../rol/rol.entity';
import {UsuarioEntity} from '../../usuario/usuario.entity';
import {RolPorUsuarioEntity} from '../rol-por-usuario.entity';

export class ActualizarRolPorUsuarioDto {

    @IsNotEmpty()
    @IsInt()
    rol: number | RolEntity;

    @IsNotEmpty()
    @IsInt()
    usuario: number | UsuarioEntity;

    constructor(rolPorUsuario: RolPorUsuarioEntity) {
        this.rol = rolPorUsuario.rol;
        this.usuario = rolPorUsuario.usuario;
    }
}
