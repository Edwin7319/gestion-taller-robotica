import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SERVICIOS_GRAFICA} from './modulos/grafica/constates/servicios-grafica';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {ReconocimientoFacialRestService} from './modulos/reconocimiento-facial/servicios/reconocimiento-facial.rest.service';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {WebcamModule} from 'ngx-webcam';
import {SERVICIOS_TALLER} from './modulos/taller/constantes/servicios-taller';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import {BreadcrumbModule, ConfirmationService, TableModule} from 'primeng';
import {SERVICIOS_ESTUDIANTE_POR_TALLER} from './modulos/estudiante-por-taller/constantes/servicios-estudiante-por-taller';
import {SERVICIOS_ESTUDIANTE} from './modulos/estudiante/constantes/servicios-estudiante';
import {CargandoService} from './servicios/cargando.service';
import {SERVICIOS_IMAGEN} from './modulos/imagen/constantes/servicios-imagen';
import {BreadcrumbsModule} from 'ng6-breadcrumbs';
import {FooterComponent} from './componentes/footer/footer.component';
import {NavbarComponent} from './componentes/navbar/navbar.component';
import {UsuarioRestService} from './modulos/usuario/servicios/usuario.service';
import {CookieModule} from 'ngx-cookie';
import {AuthService} from './modulos/auth/servicios/auth.service';
import {RolServiceGuard} from './guard/rol-guard-service.guard';
import {JwtModule} from '@auth0/angular-jwt';
import {getToken} from 'codelyzer/angular/styles/cssLexer';
import {RutaNoEncontradaComponent} from './componentes/ruta-no-encontrada/ruta-no-encontrada.component';
import {RolRestService} from './modulos/rol/servicios/rol.rest.service';
import {RolPorUsuarioRestService} from './modulos/rol/servicios/rol-por-usuario.rest.service';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import {MatCardModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    RutaNoEncontradaComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    WebcamModule,
    ToasterModule.forRoot(),
    TableModule,
    BreadcrumbModule,
    BreadcrumbsModule,
    CookieModule.forRoot(),
    JwtModule.forRoot({
      config: {
        throwNoTokenError: false,
      }
    }),
    MatCardModule
  ],
  providers: [
    ...SERVICIOS_GRAFICA,
    ...SERVICIOS_TALLER,
    ...SERVICIOS_ESTUDIANTE_POR_TALLER,
    ...SERVICIOS_ESTUDIANTE,
    ...SERVICIOS_IMAGEN,
    UsuarioRestService,
    AuthService,
    RolServiceGuard,
    CargandoService,
    ReconocimientoFacialRestService,
    ConfirmationService,
    RolRestService,
    RolPorUsuarioRestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
