import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor(private http: HttpClient) { }

  headers: HttpHeaders=new HttpHeaders({
    "Content-Type":"application/json"//tipo de dato que se va a estar enviando(json)
  })


  activarkey(nickname:string){

    const url='http://34.66.150.145:2300/usuario/usuarios/activarkey';

    return this.http.post(
      url,
      {
        "nickname":nickname
      },
      { headers: this.headers }
    ).pipe(map(data => data));


  }

  desactivarkey(nickname:string){

    const url='http://34.66.150.145:2300/usuario/usuarios/desactivarkey';

    return this.http.post(
      url,
      {
        "nickname":nickname
      },
      { headers: this.headers }
    ).pipe(map(data => data));


  }

  generarkey(nickname:string){

    const url='http://34.66.150.145:2300/usuario/usuarios/generarkey';

    return this.http.post(
      url,
      {
        "nickname":nickname
      },
      { headers: this.headers }
    ).pipe(map(data => data));


  }

  validarkey(nickname:string,token:string){

    const url='http://34.66.150.145:2300/usuario/usuarios/validarkey';

    return this.http.post(
      url,
      {
        "nickname":nickname,
	      "token": token
      },
      { headers: this.headers }
    ).pipe(map(data => data));


  }

  sendemail(correo:string,key:string){

    const url='http://34.66.150.145:2300/usuario/usuarios/sendemail';

    return this.http.post(
      url,
      {
        "correo":correo,
      	"key":key
      },
      { headers: this.headers }
    ).pipe(map(data => data));


  }

}
