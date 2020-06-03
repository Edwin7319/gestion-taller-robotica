import * as mongoose from 'mongoose';

export const esquemaAtributos = new mongoose.Schema(
    {
        faceId: {type: String},
        faceRectangle: {type: Object},
        faceAttributes: {type: Object},
        idImagen: {type: Number},
        idTaller: {type: Number},
        url: {type: String},
        etapa: {type: String},
    },
    {
        timestamps: true,
    });
