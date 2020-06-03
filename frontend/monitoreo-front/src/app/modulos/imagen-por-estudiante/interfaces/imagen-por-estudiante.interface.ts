import {EstudianteInterface} from '../../estudiante/interfaces/estudiante.interface';
import {ImagenInterface} from '../../imagen/interfaces/imagen.interface';

export class ImagenPorEstudianteInterface {
  id?: number;
  estudiante: EstudianteInterface | number;
  imagen: ImagenInterface | number;
}
