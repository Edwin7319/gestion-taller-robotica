import {IsInt, IsNotEmpty, IsOptional, IsString, Length} from 'class-validator';
import {RolEntity} from '../rol.entity';

export class CrearRolDto {

    @IsNotEmpty()
    @Length(3, 20)
    @IsString()
    tipo: string;

    @IsOptional()
    @IsInt()
    habilitado: 1 | 0;

    constructor(rol: RolEntity) {
        this.tipo = rol.tipo;
    }
}
