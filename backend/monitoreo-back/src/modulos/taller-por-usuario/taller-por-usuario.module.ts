import { Module } from '@nestjs/common';
import { TallerPorUsuarioController } from './taller-por-usuario.controller';
import { TallerPorUsuarioService } from './taller-por-usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TallerPorUsuarioEntity } from './taller-por-usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TallerPorUsuarioEntity], 'default')],
  controllers: [TallerPorUsuarioController],
  providers: [TallerPorUsuarioService],
  exports: [TallerPorUsuarioService]
})
export class TallerPorUsuarioModule {}
