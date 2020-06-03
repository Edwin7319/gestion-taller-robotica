import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ReconocimientoFacialRestService} from '../servicios/reconocimiento-facial.rest.service';
import {Observable, Subject} from 'rxjs';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import {AngularFireStorage} from '@angular/fire/storage';
import {debounce, debounceTime, finalize} from 'rxjs/operators';
import {CargandoService} from '../../../servicios/cargando.service';

@Component({
  selector: 'app-ruta-gestion-reconocimiento-facial',
  templateUrl: './ruta-gestion-reconocimiento-facial.component.html',
  styleUrls: ['./ruta-gestion-reconocimiento-facial.component.scss']
})
export class RutaGestionReconocimientoFacialComponent implements OnInit {

  @Output() datosObtenidos: EventEmitter<any> = new EventEmitter<any>();
  @Output() linkImagen: EventEmitter<string> = new EventEmitter<string>();

  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    width: {ideal: 1024},
    height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  urlImagenSubida: Observable<string>;
  imagenUrl: string;
  resultadoFoto;
  tomarFotografia = true;

  constructor(
    private readonly _reconocimientoFacialService: ReconocimientoFacialRestService,
    private readonly _angularFireStorage: AngularFireStorage
  ) {
  }

  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  obtenerInformacionFoto(imagenSubida) {
    this._reconocimientoFacialService
      .tomarDatosDeServidor(imagenSubida)
      .subscribe(
        value => {
          this.datosObtenidos.emit(value);
          // console.log(this.resultados.faceAttributes.emotion);
        }
      );
  }

  public triggerSnapshotFoto(): void {
    this.trigger.next();
    //
    // if (this.tomarFotografia) {
    //   setTimeout(() => {
    //     this.triggerSnapshot();
    //   }, 20000);
    // }
  }

  public triggerSnapshot(): void {
    this.trigger.next();

    if (this.tomarFotografia) {
      setTimeout(() => {
        this.triggerSnapshot();
      }, 20000);
    }
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public handleImage(webcamImage: WebcamImage): void {
    // console.log('received webcam image', webcamImage.imageAsDataUrl);
    this.resultadoFoto = '';
    const respuestaWebCam = webcamImage.imageAsDataUrl;
    this.imagenUrl = '';
    const idRandomImagen = Math.random().toString(36).substring(2);
    const pathArchivo = `test/profile_${idRandomImagen}`;
    const referencia = this._angularFireStorage.ref(pathArchivo);
    referencia
      .putString(respuestaWebCam, 'data_url')
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.urlImagenSubida = referencia.getDownloadURL();
        }),
      )
      .subscribe(
        value => {
        },
        error => {
          console.error({mensaje: error});
        }
      );

    setTimeout(() => {
      this.urlImagenSubida.subscribe(
        value => {
          this.imagenUrl = value;
          this.linkImagen.emit(value);
          this.obtenerInformacionFoto(value);
        }
      );
    }, 5000);
  }

  public cameraWasSwitched(deviceId: string): void {
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }
}
