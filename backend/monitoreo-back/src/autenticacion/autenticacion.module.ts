import {Module} from '@nestjs/common';
import {AutenticacionService} from './autenticacion.service';
import {AutenticacionController} from './autenticacion.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {RolEntity} from '../modulos/rol/rol.entity';
import {RolPorUsuarioEntity} from '../modulos/rol-por-usuario/rol-por-usuario.entity';
import {JwtStrategy} from './estrategia/jwt.strategy';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {UsuarioEntity} from '../modulos/usuario/usuario.entity';
import {jwtConstante} from './constantes/key';

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [
                RolPorUsuarioEntity,
                RolEntity,
                UsuarioEntity
            ],
            'default'
        ),
        PassportModule.register({
            defaultStrategy: 'jwt'
        }),
        JwtModule.register({
            secret: jwtConstante.secretkey,
            signOptions: {
                expiresIn: '2700s'
            }
        })
    ],
    providers: [
        AutenticacionService,
        JwtStrategy
    ],
    controllers: [
        AutenticacionController
    ],
    exports: [
        JwtStrategy,
        PassportModule
    ]
})
export class AutenticacionModule {
}
