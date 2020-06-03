import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {InjectRepository} from '@nestjs/typeorm';
import {UsuarioEntity} from '../../modulos/usuario/usuario.entity';
import {Repository} from 'typeorm';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {jwtConstante} from '../constantes/key';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly _usuarioRepository: Repository<UsuarioEntity>
    ) {
        super(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                ignoreExpiration: false,
                secretOrKey: jwtConstante.secretkey
            }
        );
    }

    async validate(payload) {
        try {
            const usuario = await this._usuarioRepository.findOne({
                where: {
                    cedula: payload.cedula
                }
            });
            if (!usuario) {
                throw new UnauthorizedException({mensaje: 'No tiene permisos'});
            }
            return usuario;
        } catch (e) {
            console.error(e);
        }
    }
}
