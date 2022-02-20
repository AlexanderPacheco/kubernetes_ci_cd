import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import {Persona, Carpeta} from './../models/InfP'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  _url = 'http://34.66.150.145:2300/usuario';
  UsuarioL:Persona={
    nickname: "",
  correo:     "",
  fechaNacimiento: "",
  contrasena: ""
  };

  constructor( private httpclient: HttpClient) {
    console.log('servicio login');
  }

  ValidarUsuario( nickename:any):Observable<any>{
    let header = new HttpHeaders()
    .set('Type-content','aplication/json')

    let urlnew= `${this._url}/login/${nickename}`

    return this.httpclient.get(urlnew);
  }

  PostLocalS(Usuario:Persona){
    localStorage.setItem("Logueado",JSON.stringify(Usuario));
  }

  getLocalS(){

    if(localStorage.getItem('Logueado')===null){
      return this.UsuarioL;
    }else{
      let Tas= localStorage.getItem('Logueado');
      this.UsuarioL= JSON.parse(Tas||'{}');
    return this.UsuarioL;
  }
  }

  carpeta_actual:Carpeta={
    nombre: ""
  };
  getCarpeta(){

    if(localStorage.getItem('Carpeta')===null){
      return this.carpeta_actual;
    }else{
      let Tas= localStorage.getItem('Carpeta');
      this.carpeta_actual= JSON.parse(Tas||'{}');
      return this.carpeta_actual;
    }
  }

  setCarpeta(Carpeta:Carpeta){
    localStorage.setItem("Carpeta",JSON.stringify(Carpeta));
  }

}
