import {IsNotEmpty, IsNumberString, IsString} from 'class-validator';

export class SignInDTO {

    @IsNotEmpty()
    @IsNumberString()
    cedula: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
