import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class FilesiuService {

  constructor(private http: HttpClient) { }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json" //tipo de dato que se va a estar enviando(json)
  })

  public folders: string = environment.API_FOLDERS;
  public editarUrl: string = environment.API_EDITAR_FILE;
  public moverUrl: string = environment.API_MOVER_FILE;

  getFolders( nickename:any):Observable<any>{
    let header = new HttpHeaders()
    .set('Type-content','aplication/json')

    let urlnew= `${this.folders}/${nickename}`

    return this.http.get(urlnew);
  }

  editarArchivo(nickname: string, folder: string, oldname: string, newname: string, ext: string) {
    const new_url = `${this.editarUrl}/${nickname}`;
    console.log(new_url);

    return this.http.post(
      new_url,
      {
        folder,
        oldname,
        newname,
        ext
      },
      { headers: this.headers }

    ).pipe(map(data => data));
  }

  moverArchivo(nickname: string, folder_before: string, folder_after: string, name: string, ext: string) {
    const new_url = `${this.moverUrl}/${nickname}`;

    return this.http.post(
      new_url,
      {
        folder_before,
        folder_after,
        name,
        ext
      },
      { headers: this.headers }

    ).pipe(map(data => data));
  }

}
