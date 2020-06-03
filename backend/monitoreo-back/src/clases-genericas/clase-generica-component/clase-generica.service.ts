import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {DeleteResult, Repository} from 'typeorm';

@Injectable()
export class ClaseGenericaService<Entity> {

    constructor(private readonly _repositoryEntity: Repository<Entity>) {
    }

    crear(datos: Entity): Promise<Entity | string> {
        try {
            return this._repositoryEntity.save(datos);
        } catch (e) {
            throw new InternalServerErrorException('Error con servidor');
        }
    }

    async actualizar(id: number, dato: Entity): Promise<Entity | string> {
        try {
            const datoEncontrado = await this._repositoryEntity.findOne(id);
            if (datoEncontrado) {
                await this._repositoryEntity.update(id, dato);
                return this._repositoryEntity.findOne(id);
            } else {
                return new Promise((resolve, reject) => {
                    reject('No se encontro coincidencias');
                });
            }
        } catch (e) {
            throw new InternalServerErrorException('Error con servidor');
        }
    }

    async listarTodos(skip: number, take: number): Promise<[Entity[], number] | string> {

        try {
            const repositorio$ = await this._repositoryEntity;
            return repositorio$
                .createQueryBuilder()
                .orderBy('id', 'DESC')
                .skip(skip)
                .take(take)
                .getManyAndCount();
        } catch (e) {
            throw new InternalServerErrorException('Error con base servidor');
        }
    }

    async listarPorId(id: number): Promise<Entity | string> {
        try {
            const datoEncontrado = await this._repositoryEntity.findOne(id);
            if (datoEncontrado) {
                return datoEncontrado;
            } else {
                return new Promise((resolve, reject) => {
                    reject('No se encontro coincidencias');
                });
            }
        } catch (e) {
            throw new InternalServerErrorException('Error con el servidor');
        }
    }

    async eliminar(id: number): Promise<DeleteResult> {
        try {
            const datoEncontrado = await this._repositoryEntity.findOne(id);
            if (datoEncontrado) {
                return this._repositoryEntity.delete(id);
            } else {
                return new Promise((resolve, reject) => {
                    reject('No se encontro resultados');
                });
            }
        } catch (e) {
            throw new InternalServerErrorException('Error con el servidor');
        }
    }
}
