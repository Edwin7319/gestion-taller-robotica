import {IsNotEmpty, IsNumberString, IsString} from 'class-validator';

export class SignUpDto {
    @IsNotEmpty()
    @IsNumberString()
    cedula: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
