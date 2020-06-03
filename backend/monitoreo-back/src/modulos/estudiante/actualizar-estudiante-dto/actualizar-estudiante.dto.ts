import {IsDate, IsInt, IsOptional, IsString, Length} from 'class-validator';
import {EstudianteEntity} from '../estudiante.entity';

export class ActualizarEstudianteDto {
    @IsOptional()
    @Length(3, 20)
    @IsString()
    nombre: string;

    @IsOptional()
    @Length(3, 20)
    @IsString()
    apellido: string;

    @IsOptional()
    @IsDate()
    fechaNacimiento: Date;

    @IsOptional()
    @IsInt()
    habilitado?: 1 | 0;

    constructor(estudiante: EstudianteEntity) {
        this.nombre = estudiante.nombre;
        this.apellido = estudiante.apellido;
        this.fechaNacimiento = new Date(estudiante.fechaNacimiento);
    }
}
