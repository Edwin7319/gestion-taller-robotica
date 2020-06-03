import { WebsocketModule } from '../websocket/websocket.module';
import { EstudianteModule } from '../modulos/estudiante/estudiante.module';
import { RolModule } from '../modulos/rol/rol.module';
import { UsuarioModule } from '../modulos/usuario/usuario.module';
import { RolPorUsuarioModule } from '../modulos/rol-por-usuario/rol-por-usuario.module';
import { AutenticacionModule } from '../autenticacion/autenticacion.module';
import { TallerModule } from '../modulos/taller/taller.module';
import { TallerPorUsuarioModule } from '../modulos/taller-por-usuario/taller-por-usuario.module';
import { TallerPorEscuelaModule } from '../modulos/taller-por-escuela/taller-por-escuela.module';
import { EscuelaModule } from '../modulos/escuela/escuela.module';
import { EstudiantePorTallerModule } from '../modulos/estudiante-por-taller/estudiante-por-taller.module';
import { ImagenModule } from '../modulos/imagen/imagen.module';
import { ImagenPorEstudianteModule } from '../modulos/imagen-por-estudiante/imagen-por-estudiante.module';
import { EmocionPorEstudianteModule } from '../modulos/emocion-por-estudiante/emocion-por-estudiante.module';
import { EmocionModule } from '../modulos/emocion/emocion.module';
import { AtributosCaraModule } from '../modulos/atributos-cara/atributos-cara.module';

export const ARREGLO_MODULOS = [
  WebsocketModule,
  EstudianteModule,
  RolModule,
  UsuarioModule,
  RolPorUsuarioModule,
  AutenticacionModule,
  TallerModule,
  TallerPorUsuarioModule,
  TallerModule,
  TallerPorEscuelaModule,
  EscuelaModule,
  EstudiantePorTallerModule,
  ImagenModule,
  ImagenPorEstudianteModule,
  EmocionPorEstudianteModule,
  EmocionModule,
  AtributosCaraModule
];
