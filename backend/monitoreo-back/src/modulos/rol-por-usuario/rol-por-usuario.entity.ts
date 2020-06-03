import {Entity, ManyToOne} from 'typeorm';
import {RolEntity} from '../rol/rol.entity';
import {UsuarioEntity} from '../usuario/usuario.entity';
import {ClaseGenericaEntity} from '../../clases-genericas/clase-generica-entity/clase-generica.entity';

@Entity('rol_por_usuario')
export class RolPorUsuarioEntity extends ClaseGenericaEntity {

    @ManyToOne(
        type => RolEntity,
        rol => rol.rolesPorUsuario,
        {onDelete: 'CASCADE'}
    )
    rol: number | RolEntity;

    @ManyToOne(
        type => UsuarioEntity,
        usuario => usuario.rolesPorUsuario,
        {onDelete: 'CASCADE'}
    )
    usuario: number | UsuarioEntity;
}
