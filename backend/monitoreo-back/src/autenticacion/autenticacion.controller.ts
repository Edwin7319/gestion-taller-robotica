import {Body, Controller, Post, UnauthorizedException, UsePipes, ValidationPipe} from '@nestjs/common';
import {AutenticacionService} from './autenticacion.service';
import {SignInDTO} from './autenticacion-dto/sign-in.dto';

@Controller('auth')
export class AutenticacionController {

    constructor(
        private readonly _autenticacionService: AutenticacionService
    ) {
    }

    @Post('login')
    @UsePipes(ValidationPipe)
    async signIn(
        @Body() datos: SignInDTO
    ) {
        const respuesta = await this._autenticacionService.login(datos);
        if (!respuesta) {
            throw new UnauthorizedException({
                mensaje: 'Credenciales erroneas',
                status: 401
            });
        }
        return respuesta;
    }
}
