import {InternalServerErrorException, Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ARREGLO_MODULOS} from './configuracion-inicio/arreglo-modulos';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CONFIGURACION_MYSQL} from './configuracion-inicio/configuracion-mysql';
import {ARREGLO_ENTITIES} from './configuracion-inicio/arreglo-entities';
import {MongooseModule} from '@nestjs/mongoose';
import {TallerService} from './modulos/taller/taller.service';
import {ImagenService} from './modulos/imagen/imagen.service';
import {AtributosCaraService} from './modulos/atributos-cara/atributos-cara.service';
import {CargarDatos} from './funciones/crear-datos-de-prueba';
import {AutenticacionModule} from './autenticacion/autenticacion.module';
import {UsuarioService} from './modulos/usuario/usuario.service';
import {RolService} from './modulos/rol/rol.service';
import {RolPorUsuarioService} from './modulos/rol-por-usuario/rol-por-usuario.service';

@Module({
    imports: [
        ...ARREGLO_MODULOS,
        AutenticacionModule,
        MongooseModule.forRoot(
            CONFIGURACION_MYSQL.mongoDB.uri,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useFindAndModify: false,
            },
        ),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: CONFIGURACION_MYSQL.bdd.host,
            port: CONFIGURACION_MYSQL.bdd.port,
            name: CONFIGURACION_MYSQL.bdd.name,
            connectTimeout: 20000,
            username: CONFIGURACION_MYSQL.bdd.username,
            password: CONFIGURACION_MYSQL.bdd.password,
            database: CONFIGURACION_MYSQL.bdd.database,
            entities: [...ARREGLO_ENTITIES],
            synchronize: CONFIGURACION_MYSQL.bdd.synchronize,
            dropSchema: CONFIGURACION_MYSQL.bdd.dropSchema,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {

    constructor(
        private readonly _tallerService: TallerService,
        private readonly _imagenService: ImagenService,
        private readonly _atributosCaraService: AtributosCaraService,
        private readonly _usuarioService: UsuarioService,
        private readonly _rolService: RolService,
        private readonly _rolPorUsuario: RolPorUsuarioService
    ) {
        CONFIGURACION_MYSQL.crearDatosDePrueba ? this.crearDatos() : console.log('No se creo datos de prueba');
    }

    async crearDatos() {
        try {
            await CargarDatos('src/datos-de-prueba/taller.json', this._tallerService);
            console.log('Se creo taller');

            await CargarDatos('src/datos-de-prueba/imagenes.json', this._imagenService);
            console.log('Se creo imagenes');

            await CargarDatos('src/datos-de-prueba/rol.json', this._rolService);
            console.log('Se creo rol');

            // await CargarDatos('src/datos-de-prueba/datos-faciales.json', this._atributosCaraService);
            // console.log('Se creo atributos cara');
        } catch (e) {
            console.log('Erro al crear datos de prueba');
            throw new InternalServerErrorException(e);
        }
    }
}
