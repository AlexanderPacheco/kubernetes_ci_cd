import { Injectable } from '@angular/core';

import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import {Persona} from './../models/InfP'
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SfilesService {
  //http://localhost:3500/files
  //_url = 'http://localhost:3000/Servicefiles/files';
  //_urlD='http://localhost:3500/files';
  _url = environment.API_SERV1;
  _urlD= environment.API_SERV2;

  constructor(private httpclient: HttpClient) { }

  VerFiles( nickename:any, contrasena:any,carpetas:any ,archivos:any):Observable<any>{
    let header = new HttpHeaders()
    .set('Type-content','aplication/json')

    let urlnew= `${this._url}/ver/${nickename}/${contrasena}/${carpetas}/${archivos}`
    console.log(urlnew);
    return this.httpclient.get(urlnew);
  }

  DownloadFiles( nickename:any, contrasena:any,carpetas:any ,archivos:any,extension:any):Observable<any>{
    let header = new HttpHeaders()
    .set('Type-content','aplication/json')
  ///${nickename}/${contrasena}/${carpetas}

  var te=extension.split('.');
  if(te[1]===undefined||te[1]===''||te[1]===null){
    console.log('extension sin punto');
  }else{
    console.log('extencion con punto >> ',te[1]);
    extension=te[1]
  }
  console.log(' servicio p1>> ',archivos,'  >> ',extension);
    let urlnew= `${this._urlD}/download/${archivos}/${extension}`
    window.open(urlnew,'_blank');
    return this.httpclient.get(urlnew);
  }

  deleteFiles( nickename:any, contrasena:any,carpetas:any,archivos:any,eliminado:any):Observable<any>{
    let header = new HttpHeaders()
    .set('Type-content','aplication/json')

    let urlnew= `${this._urlD}/delete/${nickename}/${contrasena}/${carpetas}/${archivos}/${eliminado}`

    return this.httpclient.get(urlnew);
  }
  ltrim(str:any) {
    if(str == null) return str;
    return str.replace(/^\s+/g, '');
  }

}
