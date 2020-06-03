import { Module } from '@nestjs/common';
import { EmocionService } from './emocion.service';
import { EmocionController } from './emocion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmocionEntity } from './emocion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmocionEntity], 'default')],
  providers: [EmocionService],
  controllers: [EmocionController],
  exports: [EmocionService],
})
export class EmocionModule {
}
