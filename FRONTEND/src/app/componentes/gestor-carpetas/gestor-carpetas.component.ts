import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { GestorCarpetasService } from "./gestor-carpetas.service";

import { RegistroService } from "../../Servicios/registro.service";
import { LoginService } from "../../Servicios/login.service";
import { FilesiuService } from "../../Servicios/filesiu.service";
import { ListCarpeta } from "../../models/InfLCarpeta";
import {ListArchivo} from "../../models/InfLArchivos";
import {Carpeta,Persona,Link} from "../../models/InfP";
import { Router } from '@angular/router';

import {SfilesService} from '../../Servicios/sfiles.service';

import Swal from 'sweetalert2';

import {Observer,OperacionesAyDrive} from "../../../PatronesDiseño/Observer/mensajes";

@Component({
  selector: 'app-gestor-carpetas',
  templateUrl: './gestor-carpetas.component.html',
  styleUrls: ['./gestor-carpetas.component.css']
})
export class GestorCarpetasComponent implements OnInit {

  componente1 = new Observer("Carpetas");
  componente2 = new Observer("Archivos");
  operaciones = new OperacionesAyDrive();



  @ViewChild('alert', { static: true }) alert: ElementRef | any;
  constructor(private ServiceFiles:SfilesService,private router: Router, private serviciolistararchivo: RegistroService, private gestorCarpetasService: GestorCarpetasService,
    private serviciolistarcarpeta: RegistroService, private storage_user: LoginService, private filesiuService: FilesiuService) {


     }

  ListaCarpetas: ListCarpeta[] = [];
    
  detalleCarpeta = {
    nombre: "",
    fechaCreacion: "",
    numeroarchivos: 0,
    nombreoriginal: "",
  }

  nombrecarpeta: any;
  rutaarchivo: any;
  folders: any;

  Usuario:Persona ={
    nickname: "",
    correo:     "",
    fechaNacimiento: "",
    contrasena: ""
  }
link:Link ={
  link:{
    S:""
  }
}
LinkImage:any;
  ver:boolean=false;
  Archivo:any;
  extension:any;
  video:boolean=false;
  Valid:boolean = false;
  NotValid:boolean = false;
  Mensaje:any;
  //carpeta='';
  ngOnInit(): void {

    this.operaciones.subscribe(this.componente1);
    this.operaciones.subscribe(this.componente2);
   // this.carpeta+=this.carpeta+'Root'
   //this.carpeta_actual.nombre = "Root";
   this.entrarCarpeta();
    this.Usuario=this.storage_user.getLocalS();
    let usuario = this.storage_user.getLocalS();
    this.listarCarpetas(usuario.nickname.toString(),this.storage_user.getCarpeta().nombre.toString());
    this.listarArchivos(usuario.nickname.toString(), this.detalleCarpeta.nombre);
    
    //this.storage_user.setCarpeta(this.carpeta_actual);

    //Agregando al local storage que estamos en carpeta Root
    //this.carpeta_actual.nombre = '/';
    //this.storage_user.setCarpeta(this.carpeta_actual);

    try {
      this.filesiuService.getFolders(this.storage_user.getLocalS().nickname.toString())
      .subscribe((data:any)=>{
        this.folders = data;
        console.log("folders: " + this.folders);
      }
      );
    } catch (error) {
      console.log(error);
    }
  }



  ListaArchivos: ListArchivo[] = [];

  detalleArchivo = {
    link: "",
    extension: "",
    fechaSubida: "",
    eliminado: 0,
    nombre: "",
    nombreantiguo: "",
    folder_before: "",
    folder_after: "",
  }

  /**
   * Funcion ya lista para eliminar carpetas, solo pasar
   * los siguientes parametros, segun se esten manejando.
   * Al iniciar sesion y al listar la informacion de las carpetas
   * @param nickname {string} nombre de la persona logeada
   * @param carpeta {string} nombre de la carpeta a eliminar
   * @author Eduardo
   */
  eliminarCarpeta(carpeta: string) {
    //let usuario = this.storage_user.getLocalS();
    console.log("entra eliminar carpeta"+carpeta);
    this.gestorCarpetasService.eliminarCarpeta(this.Usuario.nickname.toString(), carpeta.toString()).subscribe((data: any) => {
      console.log(data);

    })

    //titulo, texto, tipo, btnAceptxt, sn_Cancel, OneDialog, txtSecondDialog
    this.AlertMensajes('Eliminar Carpeta','Desea eliminar  "'+carpeta+'"?','warning','Aceptar',true,false,'Carpeta "'+carpeta+'" Eliminada Correctamente')
    this.operaciones.notify("Se elimino la carpeta: "+carpeta);
  }

  listarCarpetas(nombre: string,carpeta:string) {
    this.serviciolistarcarpeta.listarCarpeta(nombre,carpeta).subscribe((res: any) => {
      this.ListaCarpetas = res;
    });
    this.operaciones.notify("Se listaron las carpetas")
  }

  set_detallecarpeta(nombre: string, fechaCreacion: string, numeroarchivos: number) {
    this.detalleCarpeta.nombre = nombre;
    this.detalleCarpeta.fechaCreacion = fechaCreacion;
    this.detalleCarpeta.numeroarchivos = numeroarchivos;
    this.detalleCarpeta.nombreoriginal = nombre;
    console.log(this.detalleCarpeta.nombre, this.detalleCarpeta.nombreoriginal, this.detalleCarpeta.fechaCreacion)
    this.operaciones.notify("Se mostro el detalle de la carpeta");
  }

  editar_nombrecarpeta(nomcarpeta: string, nombreoriginal: string) {
    console.log("original: " + nombreoriginal + " , nombre: " + nomcarpeta);
    if (this.detalleCarpeta.nombre.trim() === "" ||
      this.detalleCarpeta.nombre === undefined ||
      this.detalleCarpeta.nombre === null) {

      //alert("HAY UN PROBLEMA, EL NOMBRE NUEVO NO ES VALIDO.");
      this.AlertMensajes('Error','HAY UN PROBLEMA, EL NOMBRE NUEVO NO ES VALIDO.','error','Ok',false,true,'--')

    } else {

      let nickname = this.storage_user.getLocalS().nickname.toString();
      let original = this.detalleCarpeta.nombreoriginal.toString().trim();
      let antiguo = this.detalleCarpeta.nombre.toString().trim();

      this.serviciolistarcarpeta.editarnombreCarpeta(nickname, original, antiguo).
        subscribe(
          res => {
            //alert("EXCELENTE!!! SE HA CAMBIADO EL NOMBRE DE LA CARPETA.");
            this.AlertMensajes('Modificacion','EXCELENTE!!! SE HA CAMBIADO EL NOMBRE DE LA CARPETA.','success','Ok',false,true,'--')
            console.log(res);
            this.operaciones.notify("Se cambio el nombre de una carpeta");
          },
          err => {
            console.log(err);
          }
        );

    }

  }

  editar_nombrearchivo(nombrearchivo: string, nombreantiguo: string, extension: string) {
    console.log("oldname: " + nombreantiguo + " , newname: " + nombrearchivo + " , extension: " + extension);
    if (this.detalleArchivo.nombre.trim() === "" ||
      this.detalleArchivo.nombre === undefined ||
      this.detalleArchivo.nombre === null) {

      //alert("HAY UN PROBLEMA, EL NOMBRE NUEVO NO ES VALIDO.");
      //titulo, texto, tipo, btnAceptxt, sn_Cancel, OneDialog, txtSecondDialog
    this.AlertMensajes('Error','HAY UN PROBLEMA, EL NOMBRE "'+nombrearchivo+'" NO ES VALIDO.','error','Ok',false,true,'--')

    } else {

      let nickname = this.storage_user.getLocalS().nickname.toString();
      let folder = "/";
      let oldname = this.detalleArchivo.nombreantiguo.toString().trim();
      let newname = this.detalleArchivo.nombre.toString().trim();
      let ext = this.detalleArchivo.extension.toString().trim();

      this.filesiuService.editarArchivo(nickname, folder, oldname, newname, ext).
        subscribe(
          res => {
            //alert("EXCELENTE!!! SE HA CAMBIADO EL NOMBRE DEL ARCHIVO.");
            this.AlertMensajes('Moodificacion','EXCELENTE!!! SE HA CAMBIADO EL NOMBRE DEL ARCHIVO A "'+nombrearchivo+'".','success','Ok',false,true,'--')
            console.log(res);
            this.operaciones.notify("Se cambio el nombre de un archivo");
          },
          err => {
            console.log(err);
          }
        );
    }
  }

  mover_archivo(name: string, ext: string, folder_before: string, folder_after: string) {
    console.log("{ folder_before: " + folder_before + " folder_after: " + folder_after + " name: " + name + " ext: " + ext + " }");

    if (this.detalleArchivo.folder_after.trim() === "" ||
      this.detalleArchivo.folder_after === undefined ||
      this.detalleArchivo.folder_after === null) {

      //alert("HAY UN PROBLEMA, LA RUTA NUEVA NO ES VALIDA.");
      //titulo, texto, tipo, btnAceptxt, sn_Cancel, OneDialog, txtSecondDialog
    this.AlertMensajes('Error','HAY UN PROBLEMA, LA RUTA NUEVA NO ES VALIDA.','error','Ok',false,true,'--')

    } else {

      let nickname = this.storage_user.getLocalS().nickname.toString();

      this.filesiuService.moverArchivo(nickname, folder_before, folder_after, name, ext).
        subscribe(
          res => {
            //alert("EXCELENTE!!! SE HA MOVIDO EL ARCHIVO.");
            this.AlertMensajes('Mover','EXCELENTE!!! SE HA MOVIDO EL ARCHIVO "'+name+'".','success','Ok',false,true,'--')
            console.log(res);
            this.operaciones.notify("Se movio de carpeta un archivo");
          },
          err => {
            console.log(err);
          }
        );
    }
  }

  listarArchivos(nombre:string,carpeta:string){
    console.log(nombre);
    console.log(carpeta);
    this.serviciolistararchivo.listarArchivo(nombre,"root").subscribe((res:any)=>{
      this.ListaArchivos=res;
    });
    this.operaciones.notify("Se listaron los archivos");
  }

  set_detallearchivo(link: string, extension: string, fechaSubida: string, nombre: string) {
    this.detalleArchivo.link = link;
    this.detalleArchivo.extension = extension;
    this.detalleArchivo.fechaSubida = fechaSubida;
    this.detalleArchivo.nombre = nombre;
    this.detalleArchivo.nombreantiguo = nombre;
    this.detalleArchivo.folder_before = this.storage_user.getCarpeta().nombre.toString();
    this.detalleArchivo.folder_after = "";
  }

  carpeta_actual: Carpeta = {
    nombre: ""
  };

  obtenerCarpeta(nombre: any) {
    this.carpeta_actual.nombre =this.storage_user.getCarpeta().nombre+"."+nombre;
    this.storage_user.setCarpeta(this.carpeta_actual);
    this.router.navigate(["/gestorarchivos"]);
  }

  entrarCarpeta(){
    var carpeta=this.storage_user.getCarpeta().nombre;
    if(carpeta!=""){
      //this.carpeta_actual.nombre=carpeta+"."+nombre
      //this.storage_user.setCarpeta(this.carpeta_actual);
      console.log("ruta no vacia")
      
    }else{
      this.carpeta_actual.nombre="Root"
      this.storage_user.setCarpeta(this.carpeta_actual);
    }
  
  }
  regresar(){
    if(this.storage_user.getCarpeta().nombre!="Root"){
      var carpeta=this.storage_user.getCarpeta().nombre
      var pos=carpeta.lastIndexOf('.')
      var nuevo=carpeta.substring(0,pos)
      this.carpeta_actual.nombre=nuevo
      this.storage_user.setCarpeta(this.carpeta_actual)
      //this.ngOnInit()
      //this.router.navigate(["/gestorcarpetas"]);
    }else{
      this.router.navigate(["/dashbordusuario"]);
    }
    this.componente1.showFeed();
    this.componente2.showFeed();
    this.operaciones.unsubscribe(this.componente1);
    this.operaciones.unsubscribe(this.componente2);
    
  }

  crearcarpeta() {
    var nueva_carpeta=this.storage_user.getCarpeta().nombre+"."+this.nombrecarpeta
    this.serviciolistararchivo.crearCarpeta(nueva_carpeta).subscribe((res: any) => {
      this.ListaArchivos = res;
    });
    //titulo, texto, tipo, btnAceptxt, sn_Cancel, OneDialog, txtSecondDialog
    this.AlertMensajes('Crear Carpeta','Carpeta "'+this.nombrecarpeta+'" creada con exito!!','success','Ok',false,true,'--')
    console.log(this.nombrecarpeta);
    this.operaciones.notify("Se creo la carpeta: "+this.nombrecarpeta);
  }

  eliminarCarpeta2() {
    //let usuario = this.storage_user.getLocalS();
    console.log("entra eliminar carpeta "+this.nombrecarpeta.toString());
    this.gestorCarpetasService.eliminarCarpeta(this.Usuario.nickname.toString(), this.nombrecarpeta.toString()).subscribe((data: any) => {
      console.log(data);
    })
  }

  eliminarArchivo() {
    //let usuario = this.storage_user.getLocalS();
    console.log("entra eliminar archivo "+this.nombrecarpeta.toString());
    this.gestorCarpetasService.eliminarArchivo(this.Usuario.nickname.toString(), this.nombrecarpeta.toString()).subscribe((data: any) => {
      console.log(data);
    })
  }

  restArchivo() {
    //let usuario = this.storage_user.getLocalS();
    console.log("entra eliminar archivo "+this.nombrecarpeta.toString());
    this.gestorCarpetasService.restArchivo(this.Usuario.nickname.toString(), this.nombrecarpeta.toString()).subscribe((data: any) => {
      console.log(data);
    })
  }


  seteo(nombre:any,extension:any,link:any){

    this.Archivo=nombre;
    this.extension=extension;
    this.LinkImage=link;
    console.log(this.Archivo,this.extension,this.LinkImage);
  }
  Mostrar(){
    if(this.extension.toLowerCase()=='png'||this.extension.toLowerCase()=='jpg'||this.extension.toLowerCase()=='jpeg'){
      this.ver=true;
    }else if(this.extension.toLowerCase()=='mp4'||this.extension.toLowerCase()=='avi'||this.extension.toLowerCase()=='mkv'||this.extension.toLowerCase()=='flv'||this.extension.toLowerCase()=='mov'||this.extension.toLowerCase()=='wmv'||this.extension.toLowerCase()=='divx'){
      this.video=true;

    }else{
      window.open(this.LinkImage,'_blank');
    }
    // try {
    //   this.ServiceFiles.VerFiles(this.Usuario.nickname,this.Usuario.contrasena,this.carpeta_actual.nombre,this.Archivo).subscribe((data:any)=>{
    //     if(data.Items[0]==undefined){
    //       console.log('falle');
    //     }else{
    //       this.link=data.Items[0];
    //       console.log(this.link.link.S);
    //       this.LinkImage=this.link.link.S;
    //     }
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  }
  Cerrar(){
    this.ver=false;
  }
  Descargar(){
    var temp=this.LinkImage.split('/');
    var temp2=temp[3].split('.');
    var ArchivoNom=temp2[0];
    try {
      this.ServiceFiles.DownloadFiles(this.Usuario.nickname,this.Usuario.contrasena,this.carpeta_actual.nombre,ArchivoNom,this.extension).subscribe((data:any)=>{
        // if(data.Items[0]==undefined){
        //   console.log('falle');
        // }else{
        //   this.link=data.Items[0];
        //   console.log(this.link.link.S);
        // }
      });
    } catch (error) {
      console.log(error);
    }
  }
  Eliminar(){

    try {
      this.ServiceFiles.deleteFiles(this.Usuario.nickname,this.Usuario.contrasena,'Root',this.Archivo,1).subscribe((data:any)=>{
        if(data.Items[0]==undefined){
          console.log('falle');
         // alert('Error al eliminar el Archivo "'+this.Archivo+'"');
         this.AlertMensajes('Error','El Archiivo "'+this.Archivo+'" no se pudo eliminar!!','error','Ok',false,true,'--')
          this.Cerrar();
          //this.NotValid=true;
        }else{
          console.log(data.Items[0]);
          //alert('Archivo "'+this.Archivo+'" eliminado correctamente.' );
          //titulo, texto, tipo, btnAceptxt, sn_Cancel, OneDialog, txtSecondDialog
          this.AlertMensajes('Eliminar Archivo','Archiivo "'+this.Archivo+'" eliminado con exito!!','success','Ok',false,true,'--')

          this.Cerrar();
          //this.Valid=true;
        }
      });
    } catch (error) {
      console.log(error);
    }

  }

  toggleVideo(){

  }
  closeAlert() {
    this.Valid=false;
    this.NotValid=false;
    this.alert.nativeElement.classList.remove('show');
  }


  AlertMensajes(titulo:any,texto:any,tipo:any,btnAceptxt:any,sn_Cancel:boolean,OneDialog:boolean,txtSecondDialog:any){
    //tipo: warning,success,danger

    if(OneDialog){
      Swal.fire({
        title: titulo,
        text: texto,
        icon: tipo,
        showCancelButton: sn_Cancel,
        confirmButtonText: btnAceptxt,
        cancelButtonText: 'Cancelar',
      }).then((result) => {

        if (result.isConfirmed) {

          window.location.reload();

        } else if (result.isDismissed) {

          console.log('Clicked No, File is safe!');

        }
      })
    }else{
      Swal.fire({
        title: titulo,
        text: texto,
        icon: tipo,
        showCancelButton: sn_Cancel,
        confirmButtonText: btnAceptxt,
        cancelButtonText: 'Cancelar',
      }).then((result) => {

        if (result.isConfirmed) {

          Swal.fire({
            title: 'Alert',
            text: txtSecondDialog,
            icon: 'success',
            confirmButtonText: 'Ok',

          }).then((result) => {

            if (result.isConfirmed) {

              window.location.reload();

            }
          })


        } else if (result.isDismissed) {

          console.log('Clicked No, File is safe!');

        }
      })

    }
  }



}
