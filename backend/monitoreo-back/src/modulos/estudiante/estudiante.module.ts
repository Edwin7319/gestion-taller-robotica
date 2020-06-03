import {Module} from '@nestjs/common';
import {EstudianteService} from './estudiante.service';
import {EstudianteController} from './estudiante.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {EstudianteEntity} from './estudiante.entity';

@Module({
    imports: [TypeOrmModule.forFeature([EstudianteEntity], 'default')],
    providers: [EstudianteService],
    controllers: [EstudianteController],
    exports: [EstudianteService]
})
export class EstudianteModule {
}
