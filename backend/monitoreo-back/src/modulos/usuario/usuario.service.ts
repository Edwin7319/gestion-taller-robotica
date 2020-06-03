import {Injectable} from '@nestjs/common';
import {ClaseGenericaService} from '../../clases-genericas/clase-generica-component/clase-generica.service';
import {UsuarioEntity} from './usuario.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class UsuarioService extends ClaseGenericaService<UsuarioEntity> {

    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly _usuarioRepository: Repository<UsuarioEntity>
    ) {
        super(_usuarioRepository);
    }

    async encontrarPorNombre(
        parametro: string,
    ): Promise<[UsuarioEntity[], number]> {
        return await this._usuarioRepository
            .createQueryBuilder('usuario')
            .where('usuario.nombre LIKE :nombre', {nombre: `%${parametro}%`})
            .getManyAndCount();
    }
}
