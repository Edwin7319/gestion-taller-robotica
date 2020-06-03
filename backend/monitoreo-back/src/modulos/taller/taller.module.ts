import { Module } from '@nestjs/common';
import { TallerController } from './taller.controller';
import { TallerService } from './taller.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TallerEntity } from './taller.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TallerEntity], 'default')],
  controllers: [TallerController],
  providers: [TallerService],
  exports: [TallerService]
})
export class TallerModule {}
