// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    // tslint:disable-next-line:max-line-length
    urlReconocimientoFacial: 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0',
    azureKey: '258d454013e14be08f206a0f4cda716f',
    urlServidor: 'http://localhost:3000/',
    firebase: {
      apiKey: 'AIzaSyC1dQtiULMW9cCZMY_Y6EzG6ApyAE-JJEA',
      authDomain: 'imagenes-aal.firebaseapp.com',
      databaseURL: 'https://imagenes-aal.firebaseio.com',
      projectId: 'imagenes-aal',
      storageBucket: 'imagenes-aal.appspot.com',
      messagingSenderId: '116837061983',
      appId: '1:116837061983:web:25fe5a31ad350cdc9292ea',
      measurementId: 'G-FV7WV8BZG1'
    }
  }
;

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
