import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class ClaseGenericaEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'creado_a',
  })
  creadoA: Date = null;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'actualizado_a',
  })
  actualizadoA: Date = null;

}
