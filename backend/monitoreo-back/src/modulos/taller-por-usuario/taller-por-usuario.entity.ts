import { Entity, ManyToOne } from 'typeorm';
import { ClaseGenericaEntity } from '../../clases-genericas/clase-generica-entity/clase-generica.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { TallerEntity } from '../taller/taller.entity';

@Entity('taller_por_usuario')
export class TallerPorUsuarioEntity extends ClaseGenericaEntity {

  @ManyToOne(
    type => UsuarioEntity,
    usuario => usuario.talleresPorUsuario,
    {
      onDelete: 'CASCADE'
    }
  )
  usuario: UsuarioEntity | number;

  @ManyToOne(
    type => TallerEntity,
    taller => taller.talleresPorUsuario,
    {
      onDelete: 'CASCADE'
    }
  )
  taller: TallerEntity | number;

}
