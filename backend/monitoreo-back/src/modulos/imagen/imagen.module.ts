import { Module } from '@nestjs/common';
import { ImagenController } from './imagen.controller';
import { ImagenService } from './imagen.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagenEntity } from './imagen.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ImagenEntity], 'default')],
  providers: [ImagenService],
  controllers: [ImagenController],
  exports: [ImagenService]
})
export class ImagenModule {}
