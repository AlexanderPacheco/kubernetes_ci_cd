import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import { Observable, throwError } from 'rxjs';
import * as CryptoJS from "crypto-js";

@Injectable({
  providedIn: 'root'
})
export class PerfilUsuarioService {

  headers : HttpHeaders = new HttpHeaders({
    "Content-Type" : "application/json"
  })

  public apiUrl: string = environment.API_USARIO
  secretKey = environment.LLAVE_ENCRIPTACION;

  constructor(private httpClient: HttpClient) { }

  mostrarUsuario(nickname:string): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/usuario/${nickname}`);
  }

  post_actualizar(datos:any){
    console.log(datos);
    const url = `${this.apiUrl}/usuarios`;
    return this.httpClient.post(url,datos,{headers : this.headers});
  }

  decrypt(textToDecrypt : string){
    return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }

}
