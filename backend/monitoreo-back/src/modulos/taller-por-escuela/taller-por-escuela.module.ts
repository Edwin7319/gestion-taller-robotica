import { Module } from '@nestjs/common';
import { TallerPorEscuelaController } from './taller-por-escuela.controller';
import { TallerPorEscuelaService } from './taller-por-escuela.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TallerPorEscuelaEntity } from './taller-por-escuela.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TallerPorEscuelaEntity], 'default')],
  controllers: [TallerPorEscuelaController],
  providers: [TallerPorEscuelaService],
  exports: [TallerPorEscuelaService],
})
export class TallerPorEscuelaModule {
}
