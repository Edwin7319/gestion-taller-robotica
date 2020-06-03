import { Module } from '@nestjs/common';
import { EmocionPorEstudianteController } from './emocion-por-estudiante.controller';
import { EmocionPorEstudianteService } from './emocion-por-estudiante.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmocionPorEstudianteEntity } from './emocion-por-estudiante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmocionPorEstudianteEntity], 'default')],
  controllers: [EmocionPorEstudianteController],
  providers: [EmocionPorEstudianteService],
  exports: [EmocionPorEstudianteService],
})
export class EmocionPorEstudianteModule {
}
