import {Injectable} from '@nestjs/common';
import {ClaseGenericaService} from '../../clases-genericas/clase-generica-component/clase-generica.service';
import {EstudianteEntity} from './estudiante.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class EstudianteService extends ClaseGenericaService<EstudianteEntity> {

    constructor(
        @InjectRepository(EstudianteEntity)
        private readonly _estudianteRepository: Repository<EstudianteEntity>,
    ) {
        super(_estudianteRepository);
    }

    async encontrarPorNombreOApellido(
        parametro: string,
    ): Promise<[EstudianteEntity[], number]> {
        return await this._estudianteRepository
            .createQueryBuilder('estudiante')
            .where('estudiante.nombre LIKE :nombre', {nombre: `%${parametro}%`})
            .getManyAndCount();
    }

    async listarEstudiantesDisponibles(
        skip: number,
        take: number,
    ): Promise<[EstudianteEntity[], number] | string> {
        try {
            const query = await this._estudianteRepository;
            return query
                .createQueryBuilder('estudiante')
                .leftJoinAndSelect(
                    'estudiante.estudiantesPorTaller',
                    'estudiantePorTaller',
                    'estudiante.id = estudiantePorTaller.estudiante',
                )
                .where('estudiantePorTaller.estudiante is null')
                .andWhere('estudiante.habilitado =:activo', {activo: 1})
                .orderBy('estudiante.id', 'DESC')
                .skip(skip)
                .take(take)
                .getManyAndCount();
        } catch (e) {
            console.error({
                error: e
            });
            return new Promise((resolve, reject) => {
                reject('Error buscando .');
            });
        }
    }

}
