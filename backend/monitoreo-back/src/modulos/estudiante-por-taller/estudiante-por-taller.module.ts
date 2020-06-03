import { Module } from '@nestjs/common';
import { EstudiantePorTallerService } from './estudiante-por-taller.service';
import { EstudiantePorTallerController } from './estudiante-por-taller.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudiantePorTallerEntity } from './estudiante-por-taller.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EstudiantePorTallerEntity], 'default')],
  providers: [EstudiantePorTallerService],
  controllers: [EstudiantePorTallerController],
  exports: [EstudiantePorTallerService]
})
export class EstudiantePorTallerModule {}
