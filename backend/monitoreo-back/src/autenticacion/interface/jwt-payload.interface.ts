export interface JwtPayloadInterface {
    id?: number;
    cedula?: string;
    password?: string;
    roles?: any;
    iat?: Date;
}
