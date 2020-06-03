import { Module } from '@nestjs/common';
import { AtributosCaraService } from './atributos-cara.service';
import { AtributosCaraController } from './atributos-cara.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { esquemaAtributos } from './esquema/esquema.atributos';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Atributos', schema: esquemaAtributos }])],
  providers: [AtributosCaraService],
  controllers: [AtributosCaraController],
  exports: [AtributosCaraService],
})
export class AtributosCaraModule {
}
