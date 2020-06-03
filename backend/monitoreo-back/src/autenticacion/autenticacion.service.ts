import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClaseGenericaService } from '../clases-genericas/clase-generica-component/clase-generica.service';
import { UsuarioEntity } from '../modulos/usuario/usuario.entity';
import { SignInDTO } from './autenticacion-dto/sign-in.dto';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AutenticacionService extends ClaseGenericaService<UsuarioEntity> {

  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly _usuarioRepository: Repository<UsuarioEntity>,
    private readonly _jwtService: JwtService,
  ) {
    super(_usuarioRepository);
  }

  async login(singIn: SignInDTO): Promise<{ token: string, dataUser }> {
    try {
      const usuario = await this._usuarioRepository
        .createQueryBuilder('usuario')
        .innerJoinAndSelect('usuario.rolesPorUsuario', 'rolPorUsuario', 'rolPorUsuario.usuario = usuario.id')
        .innerJoinAndSelect('rolPorUsuario.rol', 'rol', 'rolPorUsuario.rol = rol.id')
        .where('usuario.cedula =:cedulaU', { cedulaU: singIn.cedula })
        .getOne();

      if (!usuario) {
        throw new NotFoundException({
          mensaje: 'Usuario no existe',
        });
      }

      const isMatch = await compare(singIn.password, usuario.password);

      if (!isMatch) {
        throw new UnauthorizedException({
          mensaje: 'Credenciales erroneas',
        });
      }

      const roles = usuario.rolesPorUsuario
        .map(
          (value: any) => {
            return value.rol.tipo;
          },
        );

      const payload = {
        id: usuario.id,
        cedula: usuario.cedula,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        roles
      };

      const token = await this._jwtService.sign(payload);
      return {
        token,
        dataUser: {
          cedula: usuario.cedula,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          habilitado: usuario.habilitado,
          roles
        },
      };
    } catch (e) {
      console.error({
        mensaje: 'Error signIn',
        error: e,
      });
    }
  }
}
