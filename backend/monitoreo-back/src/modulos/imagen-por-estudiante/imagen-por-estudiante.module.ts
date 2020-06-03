import { Module } from '@nestjs/common';
import { ImagenPorEstudianteService } from './imagen-por-estudiante.service';
import { ImagenPorEstudianteController } from './imagen-por-estudiante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagenPorEstudianteEntity } from './imagen-por-estudiante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ImagenPorEstudianteEntity], 'default')],
  providers: [ImagenPorEstudianteService],
  controllers: [ImagenPorEstudianteController],
  exports: [ImagenPorEstudianteService],
})
export class ImagenPorEstudianteModule {
}
