import {Column, Entity, OneToMany} from 'typeorm';
import {ClaseGenericaEntity} from '../../clases-genericas/clase-generica-entity/clase-generica.entity';
import {RolPorUsuarioEntity} from '../rol-por-usuario/rol-por-usuario.entity';

@Entity('rol')
export class RolEntity extends ClaseGenericaEntity {

    @Column({
        type: 'varchar',
        name: 'tipo',
        length: 20,
    })
    tipo: string = null;

    @Column({
        type: 'tinyint',
        name: 'habilitado',
        default: 1
    })
    habilitado: 1 | 0 = 1;

    @OneToMany(
        type => RolPorUsuarioEntity,
        rolPorUsuario => rolPorUsuario.rol
    )
    rolesPorUsuario: RolPorUsuarioEntity[];
}
