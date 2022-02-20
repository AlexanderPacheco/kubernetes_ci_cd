import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Carpeta, Persona} from "../models/InfP";
import {LoginService} from "../Servicios/login.service";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  Usuario: Persona = {

    nickname : "",
    correo: "",
    fechaNacimiento:"",
    contrasena:"",


  }

  carpeta_actual:Carpeta={
    nombre: "root"
  };

  constructor(private http: HttpClient, private usuario: LoginService,private storage_user:LoginService) { }

  pushFileToStorage(file: File | undefined): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    // @ts-ignore
    formdata.append('file', file);

    this.Usuario = this.usuario.getLocalS();
    var nUser = this.Usuario.nickname;

    this.carpeta_actual = this.storage_user.getCarpeta();

    //const url="http://localhost:3500/upload";
    const url = environment.API_FILEUPLOAD;
    var new_url="";
    var directorio=this.carpeta_actual.nombre.toString();
    const root="root";
    if(directorio=="/"){
      console.log("carpetaRoot");
      new_url=`${url}/${nUser}/${root}`;
    }else {
      console.log("carpetaInterna");
      new_url=`${url}/${nUser}/${directorio}`;
    }
console.log(new_url)

    const req = new HttpRequest('POST', new_url, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

}
