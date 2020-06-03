import { Module } from '@nestjs/common';
import { EscuelaController } from './escuela.controller';
import { EscuelaService } from './escuela.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EscuelaEntity } from './escuela.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EscuelaEntity], 'default')],
  controllers: [EscuelaController],
  providers: [EscuelaService],
  exports: [EscuelaService],
})
export class EscuelaModule {
}
