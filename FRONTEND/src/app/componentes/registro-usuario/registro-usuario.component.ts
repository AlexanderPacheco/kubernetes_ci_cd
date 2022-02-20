import { Component, OnInit } from '@angular/core';
import { RegistroService } from '../../Servicios/registro.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {

  
  user={
    nickname:"",
    correo:"",
    fechaNacimiento:"",
    contrasena:"",
    confcontrasena:""
  }
  
  constructor( private servicio_registro:RegistroService,private router: Router ) { }

  ngOnInit(): void {
    /*let encriptar=this.servicio_registro.encrypt("AnaGT_09@gmail.com");
    let desencriptar=this.servicio_registro.decrypt(encriptar);
    console.log("Encriptado: "+encriptar);
    console.log("Desencriptado: "+desencriptar);*/
    //console.log("----> "+this.servicio_registro.encrypt("mariotun"))
  }

  

  Regsitro(){
    
    try {

      if(this.user.nickname.trim()===""||this.user.correo.trim()===""||
      this.user.fechaNacimiento.trim()===""||
      this.user.contrasena.trim()===""||this.user.confcontrasena.trim()===""){

        //alert("DATOS INVALIDOS, DEBE DE LLENAR TODOS LOS CAMPOS.");
        this.AlertMensajes('Error','DATOS INVALIDOS, DEBE DE LLENAR TODOS LOS CAMPOS.','error','Ok',false,true,'--')
      
      }else if(this.user.contrasena!=this.user.confcontrasena){
        //alert("CONTRASEÑA INVALIDA, LA CONFIRMACION DEBE DE SER LA MISMA.");
        this.AlertMensajes('Error','CONTRASEÑA INVALIDA, LA CONFIRMACION DEBE DE SER LA MISMA.','error','Ok',false,true,'--')

      }else{
        let correo="";
     // let correo_encrip=this.servicio_registro.encrypt(this.user.correo.trim());
      //console.log("correo a encriptar: "+correo_encrip);
      this.servicio_registro.validar_existencia(this.user.nickname.trim())
      .subscribe((data:any)=>{
        
        if(data.Count==1){
          
          correo=this.servicio_registro.decrypt(data.Items[0].correo);
          //alert("EL NICKNAME YA SE ENCUENTRA REGISTRADO,\n\nINTENTA CON OTRO.");
          this.AlertMensajes('Alerta','EL NICKNAME YA SE ENCUENTRA REGISTRADO,INTENTA CON OTRO.','warning','Ok',false,true,'--')
       
        }else{

            if( correo===this.user.correo ){
              //alert("EL CORREO YA SE ENCUENTRA REGISTRADO,\n\nINTENTA CON OTRO.");
              this.AlertMensajes('Alerta','EL CORREO YA SE ENCUENTRA REGISTRADO,\n\nINTENTA CON OTRO.','warning','Ok',false,true,'--')

            }else{

              let correo_encrip=this.servicio_registro.encrypt(this.user.correo.trim());
              let contra_encrip=this.servicio_registro.encrypt(this.user.contrasena.trim());

              //metodo para registrar definitivamente el usuario.
              this.Ingresar(this.user.nickname,correo_encrip,this.user.fechaNacimiento,contra_encrip);
              
              //alert("TE HAS REGISTRADO CORRECTAMENTE")
              this.AlertMensajes('Registrar','TE HAS REGISTRADO CORRECTAMENTE','success','Ok',false,true,'--')
              this.router.navigate(['/iniciosesion']);
            }
        }
      }
      );

    }//fin del else principal

    } catch (error) {
      this.router.navigate(['/']);
      console.log(error);
    }

    
  }


  Ingresar(nickname:string,correo:string,fechaNacimiento:string,contrasena:string){

    this.servicio_registro.registrar_usuario(nickname,correo,fechaNacimiento,contrasena)
      .subscribe(
        res=>{
          console.log(res);
        },
        err =>{
          console.log(err);
        }
    );

  }


  //Mensajes o Alertas
  AlertMensajes(titulo:any,texto:any,tipo:any,btnAceptxt:any,sn_Cancel:boolean,OneDialog:boolean,txtSecondDialog:any){
    //tipo: warning,success,error

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
