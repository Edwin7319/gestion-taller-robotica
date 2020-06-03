import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment.prod';

@Injectable()
export class ReconocimientoFacialRestService {

  readonly URL = environment.urlReconocimientoFacial;
  readonly atributosExtras = '/detect?returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise';

  constructor(
    private readonly _httpClient: HttpClient
  ) {
  }

  // detectar rostro
  // recuperar ids
  tomarDatosDeServidor(urlImagen: string): Observable<any> {

    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': environment.azureKey
      }
    );
    const options = {headers};
    return this._httpClient.post(this.URL + this.atributosExtras, {url: urlImagen}, options);
  }

  crearGrupo(idGrupo, datos): Observable<any> {
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': environment.azureKey
      }
    );
    const options = {headers};
    return this._httpClient.put(`${this.URL}/persongroups/${idGrupo}`, datos, options);
  }

  obtnerGrupos(): Observable<any> {
    return this._httpClient.get(`${this.URL}/persongroups`);
  }

  crearPersonasEnGrupo(idGrupo, datos) {
    // /persongroups/{personGroupId}/persons
    // retorna personId
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': environment.azureKey
      }
    );
    const options = {headers};
    return this._httpClient.post(`${this.URL}/persongroups/${idGrupo}/persons`, datos, options);
  }

  obtenerTodasPersonasDelGrupos(idGrupo) {
    // https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/69/persons
    // retorna [
    //     {
    //         "personId": "22920ad5-8638-47b8-a902-e00f06926bd5",
    //         "persistedFaceIds": [],
    //         "name": "Edwin Paul",
    //         "userData": null
    //     }
    // ]
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': environment.azureKey
      }
    );
    const options = {headers};
    return this._httpClient.get(`${this.URL}/persongroups/${idGrupo}/persons`, options);
  }

  agregarRostroDePersonaEnGrupo(idGrupo, personId, urlImagen) {
    // persongroups/69/persons/22920ad5-8638-47b8-a902-e00f06926bd5/persistedFaces
    // retorna  "persistedFaceId": "95945979-9087-4bc0-aa29-7abe0891a7cd"
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': environment.azureKey
      }
    );
    const options = {headers};
    return this._httpClient.post(`${this.URL}/persongroups/${idGrupo}/persons/${personId}/persistedFaces`, {url: urlImagen}, options);
  }

  entrenarGrupoPersonas(idGrupo) {
    // https://{endpoint}/face/v1.0/persongroups/{personGroupId}/train
    // no retorna nada :v
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': environment.azureKey
      }
    );
    const options = {headers};
    return this._httpClient.post(`${this.URL}/persongroups/${idGrupo}/train`, null, options);
  }

  verificarEstadoDeEntrenamiento(idGrupo) {
    // respuesta {
    //     "status": "succeeded",
    //     "createdDateTime": "2020-01-30T15:47:17.3997487Z",
    //     "lastActionDateTime": "2020-01-30T15:47:17.7291172Z",
    //     "message": null
    // }
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': environment.azureKey
      }
    );
    const options = {headers};
    return this._httpClient.get(`${this.URL}/persongroups/${idGrupo}/training`, options);
  }

  identificarRostroDePersona(datos) {
    // tps://{endpoint}/face/v1.0/identify
    // cuerpo = {
    //            "personGroupId": "69",
    //            "faceIds": [
    //            	"c6b191b5-5e00-4ed5-a555-7928155a4325",
    //            	"eaf3bde7-2e93-4839-9999-3a3ed0854385"
    //            	]
    // }
    /*
    *retorna
    * [
    {
        "faceId": "c6b191b5-5e00-4ed5-a555-7928155a4325",
        "candidates": [
            {
                "personId": "22920ad5-8638-47b8-a902-e00f06926bd5",
                "confidence": 0.75595
            }
        ]
    },
    {
        "faceId": "eaf3bde7-2e93-4839-9999-3a3ed0854385",
        "candidates": []
    }
]
    * */
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': environment.azureKey
      }
    );
    const options = {headers};
    return this._httpClient.post(`${this.URL}/identify`, datos, options);
  }

  obtenerInformacionDePersona(idGrupo, idPersona) {
    // https://{endpoint}/face/v1.0/persongroups/{personGroupId}/persons/{personId}
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': environment.azureKey
      }
    );
    const options = {headers};
    return this._httpClient.get(`${this.URL}/persongroups/${idGrupo}/persons/${idPersona}`, options);
  }
}
