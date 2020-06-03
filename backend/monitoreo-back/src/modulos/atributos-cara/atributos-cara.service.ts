import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {AtributosInterface} from './interfaces/atributos.interface';
import * as moment from 'moment';

@Injectable()
export class AtributosCaraService {
    constructor(
        @InjectModel('Atributos') private readonly _atributosModel: Model<AtributosInterface>,
    ) {
    }

    // carga masiva
    // async crear(atributos): Promise<any> {
    //
    //     try {
    //         atributos.forEach(
    //             async (value) => {
    //                 const respuesta = new this._atributosModel(value);
    //                 await respuesta.save();
    //                 return respuesta;
    //             }
    //         );
    //     } catch (e) {
    //         console.log(e);
    //         return new Promise((resolve, reject) => {
    //             reject('No se creo');
    //         });
    //     }
    // }

    async crear(atributos): Promise<AtributosInterface | string> {
        try {
            const respuesta = new this._atributosModel(atributos);
            await respuesta.save();
            return respuesta;
        } catch (e) {
            return new Promise((resolve, reject) => {
                reject('No se creo ');
            });
        }
    }

    async listarTodos(): Promise<AtributosInterface[] | string> {
        try {
            const respuesta = this._atributosModel.find();
            return respuesta;
        } catch (e) {
            return new Promise((resolve, reject) => {
                reject('Error al buscar');
            });
        }
    }

    async buscarEntreFechas(
        fechaInicio: string | Date,
        fechaFin: string | Date,
        etapaTaller: string,
        tallerId: number
    ): Promise<AtributosInterface[] | string> {
        console.log(tallerId)
        try {
            fechaInicio = moment(fechaInicio).format('YYYY-MM-DDTHH:mm:ss.000') + 'Z';
            fechaInicio = new Date(fechaInicio);
            fechaFin = moment(fechaFin).format('YYYY-MM-DDTHH:mm:ss.000') + 'Z';
            fechaFin = new Date(fechaFin);
            console.log(fechaInicio)
            const respuesta = this._atributosModel.find(
                {
                    createdAt: {
                        $gte: fechaInicio,
                        $lt: fechaFin
                    },
                    etapa: etapaTaller,
                    idTaller: tallerId
                }
            ).sort({createdAt: 1});
            return respuesta;
        } catch (e) {
            console.log(e);
            return new Promise((resolve, reject) => {
                reject('Error buscando entre fechas');
            });
        }
    }
}
