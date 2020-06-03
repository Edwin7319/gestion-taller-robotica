import {Column, CreateDateColumn, Entity, OneToMany, UpdateDateColumn} from 'typeorm';
import {ClaseGenericaEntity} from '../../clases-genericas/clase-generica-entity/clase-generica.entity';
import {RolPorUsuarioEntity} from '../rol-por-usuario/rol-por-usuario.entity';
import { TallerPorUsuarioEntity } from '../taller-por-usuario/taller-por-usuario.entity';

@Entity('usuario')
export class  UsuarioEntity extends ClaseGenericaEntity {

    @Column({
        type: 'varchar',
        name: 'nombre_usuario',
        length: 20,
    })
    nombre: string = null;

    @Column({
        type: 'varchar',
        name: 'apellido_usuario',
        length: 20,
    })
    apellido: string = null;

    @Column({
        type: 'varchar',
        name: 'cedula',
        length: 10,
    })
    cedula: string = null;

    @Column({
        type: 'varchar',
        name: 'correo',
        length: 50,
    })
    correo: string = null;

    @Column({
        type: 'varchar',
        name: 'password',
        length: 255
    })
    password: string = null;

    @Column({
        type: 'tinyint',
        name: 'habilitado',
        default: 1
    })
    habilitado: 1 | 0 = 1;

  @OneToMany(
      type => RolPorUsuarioEntity,
      rolPorUsuario => rolPorUsuario.usuario
  )
  rolesPorUsuario: RolPorUsuarioEntity[];

    @OneToMany(
      type => TallerPorUsuarioEntity,
      tallerPorUsuario => tallerPorUsuario.usuario
    )
    talleresPorUsuario: TallerPorUsuarioEntity[];
}
