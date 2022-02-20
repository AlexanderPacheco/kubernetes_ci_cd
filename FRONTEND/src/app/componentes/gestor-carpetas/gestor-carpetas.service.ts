import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class GestorCarpetasService {

  public apiUrl: string = environment.API_ELIMINAR_CARPETA

  constructor(private httpClient: HttpClient) { }

  eliminarCarpeta(nickname:string, carpeta:string):Observable<any>{
    console.log(`${this.apiUrl}/eliminarCarpeta/${nickname}/${carpeta}`);
    return this.httpClient.get(`${this.apiUrl}/eliminarCarpeta/${nickname}/${carpeta}`);
  }

  eliminarArchivo(nickname:string, archivo:string):Observable<any>{
    console.log(`${this.apiUrl}/eliminarCarpeta/${nickname}/${archivo}`);
    return this.httpClient.get(`http://34.66.150.145:2300/files/delete/${nickname}/123/Root/${archivo}/1`);
  }

  restArchivo(nickname:string, archivo:string):Observable<any>{
    console.log(`${this.apiUrl}/eliminarCarpeta/${nickname}/${archivo}`);
    return this.httpClient.get(`http://34.66.150.145:2300/files/delete/${nickname}/123/Root/${archivo}/0`);
  }


}
