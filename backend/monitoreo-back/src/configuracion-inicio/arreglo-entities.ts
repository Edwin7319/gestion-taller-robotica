import { EstudianteEntity } from '../modulos/estudiante/estudiante.entity';
import { RolEntity } from '../modulos/rol/rol.entity';
import { UsuarioEntity } from '../modulos/usuario/usuario.entity';
import { RolPorUsuarioEntity } from '../modulos/rol-por-usuario/rol-por-usuario.entity';
import { TallerEntity } from '../modulos/taller/taller.entity';
import { TallerPorUsuarioEntity } from '../modulos/taller-por-usuario/taller-por-usuario.entity';
import { TallerPorEscuelaEntity } from '../modulos/taller-por-escuela/taller-por-escuela.entity';
import { EscuelaEntity } from '../modulos/escuela/escuela.entity';
import { EstudiantePorTallerEntity } from '../modulos/estudiante-por-taller/estudiante-por-taller.entity';
import { ImagenEntity } from '../modulos/imagen/imagen.entity';
import { ImagenPorEstudianteEntity } from '../modulos/imagen-por-estudiante/imagen-por-estudiante.entity';
import { EmocionPorEstudianteEntity } from '../modulos/emocion-por-estudiante/emocion-por-estudiante.entity';
import { EmocionEntity } from '../modulos/emocion/emocion.entity';

export const ARREGLO_ENTITIES = [
  EstudianteEntity,
  RolEntity,
  UsuarioEntity,
  RolPorUsuarioEntity,
  TallerEntity,
  TallerPorUsuarioEntity,
  TallerEntity,
  TallerPorEscuelaEntity,
  EscuelaEntity,
  EstudiantePorTallerEntity,
  ImagenEntity,
  ImagenPorEstudianteEntity,
  EmocionPorEstudianteEntity,
  EmocionEntity,
];
