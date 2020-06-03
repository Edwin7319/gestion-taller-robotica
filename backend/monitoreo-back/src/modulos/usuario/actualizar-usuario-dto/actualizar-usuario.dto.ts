import {IsEmail, IsInt, IsNumberString, IsOptional, IsString, Length} from 'class-validator';
import {UsuarioEntity} from '../usuario.entity';

export class ActualizarUsuarioDto {

    @IsOptional()
    @Length(3, 20)
    @IsString()
    nombre: string;

    @IsOptional()
    @Length(3, 20)
    @IsString()
    apellido: string;

    @IsOptional()
    @Length(10, 10)
    @IsNumberString()
    cedula: string;

    @IsOptional()
    @Length(5, 50)
    @IsEmail()
    correo: string;

    @IsOptional()
    @Length(3, 100)
    @IsString()
    password: string;

    @IsOptional()
    @IsInt()
    habilitado: 1 | 0;

    constructor(usuario: UsuarioEntity) {
        this.nombre = usuario.nombre;
        this.apellido = usuario.apellido;
        this.cedula = usuario.cedula;
        this.correo = usuario.correo;
        this.password = usuario.password;
        this.habilitado = usuario.habilitado;
    }
}
