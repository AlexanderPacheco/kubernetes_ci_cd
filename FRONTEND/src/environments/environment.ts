// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,

  API_SERV3: 'http://34.66.150.145:2300/filesmas/all', //'http://localhost:3000/ListaArchivos/all'//const url="http://localhost:3000/ListaArchivos/all",
  API_FILEUPLOAD : "http://34.66.150.145:2300/filesmas/upload",
  API_SERV2: 'http://34.66.150.145:2300/filesmas/files',
  API_SERV5: 'http://34.66.150.145:2300/filesmas/eliminados',//http://localhost:3000/ListaArchivos/eliminados'
  API_SERV6: 'http://34.66.150.145:2300/filesmas/eliminaciondef', //'http://localhost:3000/ListaArchivos/eliminaciondef',
  API_SERV7: 'http://34.66.150.145:2300/filesmas/restaurar', //'http://localhost:3000/ListaArchivos/restaurar',
  API_SERV1: 'http://34.66.150.145:2300/files',//'http://localhost:3000/Servicefiles/files',
  API_EDITAR_FILE: 'http://34.66.150.145:2300/api/v1/editfile',//'http://localhost:3000/servicioFiles/api/v1/editfile',
  API_MOVER_FILE: 'http://34.66.150.145:2300/api/v1/movefile',//'http://localhost:3000/servicioFiles/api/v1/movefile',
  API_FOLDERS: 'http://34.66.150.145:2300/api/v1/folder',//'http://localhost:3000/servicioFiles/api/v1/folder',

  API_ELIMINAR_CARPETA: 'http://34.66.150.145:2300/eliminarCarpeta',//'http://localhost:3000/eliminarCarpeta/api/v1',
  API_LISTAR_CARPETA: 'http://34.66.150.145:2300/listarCarpeta', //'http://localhost:3000/listarcarpeta/func/g2',
  API_SERV4: 'http://34.66.150.145:2300/crearCarpeta/ccarpeta', //'http://localhost:3000/CrearCarpetas/ccarpeta'
  API_EDITAR_CARPETA: 'http://34.66.150.145:2300/editarCarpeta',//'http://localhost:3000/editarcarpeta/func/g2',

  API_USARIO: 'http://34.66.150.145:2300/usuario',//'http://localhost:3000/usuario/api/v1',
  API_REGISTRO_USUARIO: 'http://34.66.150.145:2300/usuario',//'http://localhost:3000/usuario/api/v1',

  API_LISTAR_REPORTE: 'http://34.66.150.145:2300/reportes/logs',//'http://localhost:3000/listareporte/reporte/logs',

  LLAVE_ENCRIPTACION: 'mysecretkey',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
