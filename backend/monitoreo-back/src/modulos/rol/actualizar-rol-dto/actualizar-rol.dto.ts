import {IsInt, IsOptional, IsString, Length} from 'class-validator';
import {RolEntity} from '../rol.entity';

export class ActualizarRolDto {

    @IsOptional()
    @Length(3, 20)
    @IsString()
    tipo: string;

    @IsOptional()
    @IsInt()
    habilitado: 1 | 0;

    constructor(rol: RolEntity) {
        this.tipo = rol.tipo;
        this.habilitado = rol.habilitado;
    }
}
