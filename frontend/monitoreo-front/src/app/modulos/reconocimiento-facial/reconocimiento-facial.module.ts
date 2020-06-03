import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReconocimientoFacialRoutingModule} from './reconocimiento-facial-routing.module';
import {RutaGestionReconocimientoFacialComponent} from './ruta-gestion-reconocimiento-facial/ruta-gestion-reconocimiento-facial.component';
import {FormsModule} from '@angular/forms';
import {WebcamModule} from 'ngx-webcam';


@NgModule({
    declarations: [
        RutaGestionReconocimientoFacialComponent
    ],
    exports: [
        RutaGestionReconocimientoFacialComponent
    ],
    imports: [
        CommonModule,
        ReconocimientoFacialRoutingModule,
        FormsModule,
        WebcamModule
    ]
})
export class ReconocimientoFacialModule {
}
