import { Module } from '@nestjs/common';
import { RolController } from './rol.controller';
import { RolService } from './rol.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {RolEntity} from './rol.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RolEntity], 'default')],
  controllers: [RolController],
  providers: [RolService],
  exports: [RolService]
})
export class RolModule {}
