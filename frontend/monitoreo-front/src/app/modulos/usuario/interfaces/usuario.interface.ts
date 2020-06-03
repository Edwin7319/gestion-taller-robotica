export interface UsuarioInterface {
  id?: number;
  nombre?: string;
  apellido?: string;
  correo?: string;
  cedula?: string;
  password?: string;
  habilitado?: 1 | 0;
  rol?: any;
}
