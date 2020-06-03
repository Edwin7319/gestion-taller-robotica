import {IsInt, IsNotEmpty} from 'class-validator';
import {RolPorUsuarioEntity} from '../rol-por-usuario.entity';
import {RolEntity} from '../../rol/rol.entity';
import {UsuarioEntity} from '../../usuario/usuario.entity';

export class CrearRolPorUsuarioDto {

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
