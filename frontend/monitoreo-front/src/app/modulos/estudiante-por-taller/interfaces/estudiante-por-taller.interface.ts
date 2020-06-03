import {TallerInterface} from '../../taller/interfaces/taller.interface';
import {EstudianteInterface} from '../../estudiante/interfaces/estudiante.interface';

export class EstudiantePorTallerInterface {
  id?: number;
  taller: TallerInterface | number;
  estudiante: EstudianteInterface | number;
}
