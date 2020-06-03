import {IsInt, IsNumberString, IsNotEmpty, IsString, Length, IsOptional, IsEmail, IsIn} from 'class-validator';
import {UsuarioEntity} from '../usuario.entity';

export class CrearUsuarioDto {
    @IsNotEmpty()
    @Length(3, 20)
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @Length(3, 20)
    @IsString()
    apellido: string;

    @IsNotEmpty()
    @Length(10, 10)
    @IsNumberString()
    cedula: string;

    @IsNotEmpty()
    @Length(5, 50)
    @IsEmail()
    correo: string;

    @IsNotEmpty()
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
    }
}
