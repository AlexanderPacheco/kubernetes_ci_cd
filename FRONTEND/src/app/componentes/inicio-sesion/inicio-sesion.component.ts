import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {LoginService} from './../../Servicios/login.service';
import {Carpeta, Persona} from './../../models/InfP';
import { Router } from '@angular/router';
import { RegistroService } from '../../Servicios/registro.service';
import { AutenticacionService } from '../../Servicios/autenticacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {
  @ViewChild('alert', { static: true }) alert: ElementRef | any;
  @ViewChild('ModalCodigo') content: any;
  showModalBox: boolean = false;

  Usuario:Persona= {
    nickname: "",
    correo:     "",
    fechaNacimiento: "",
    contrasena: ""
  };
  nickname:any;
  contrasena:any;
  Valid:boolean = false;
  error:boolean = false;
  codigo={key:""};

  constructor(private servAuten:AutenticacionService,private servicio_registro:RegistroService,private LoginService: LoginService,private router: Router) { 

  }

  ngOnInit(): void {
   // this.login("usuario3","123456");
  }

  deshabilitar(){

  }

  carpeta_actual:Carpeta={
    nombre: ""
  };

  closeAlert() {
    this.Valid=false;
    this.alert.nativeElement.classList.remove('show');
  }
  
  login(){
    try {
      this.LoginService.ValidarUsuario(this.nickname).subscribe((data:any)=>{
        if(data.Items[0]==undefined){
          console.log('falle');
          this.Valid=true;
        }else{
          this.Usuario=data.Items[0];
          console.log(data.Items[0]);
           if(this.Usuario.nickname!=''||this.Usuario.nickname!=null||this.Usuario.nickname!=undefined){
             console.log('contraseña de la bd >>>',this.Usuario.contrasena);
            var contraseña =this.servicio_registro.decrypt(this.Usuario.contrasena.toString());
            console.log('contraseña desencriptada >>>',contraseña);
            if(contraseña===this.contrasena){
              this.LoginService.PostLocalS(this.Usuario);
              this.autenticacion2fa();
             //this.router.navigate(['/dashbordusuario']);
            }else{
              this.Valid=true;
            }
             
           }  
        }
        
           this.LoginService.setCarpeta(this.carpeta_actual);
      });
    } catch (error) {
      this.router.navigate(['/']);
      console.log(error);
    }

  }

  autenticacion2fa(){
    try {
      let nickname=this.LoginService.getLocalS().nickname;
      let correo=this.servicio_registro.decrypt(this.LoginService.getLocalS().correo.toString());
      this.servAuten.generarkey(nickname.toString()).subscribe((data:any)=>{
        console.log("--->DATOS:"+data.datos+"-->TIPO:"+typeof(data.datos)+"--->TOKEN:"+data.token)
        if(data.datos===undefined || data.datos==="nothing"){
           //alert("NO SE PUDO GENERAR LA CLAVE PARA INICIAR SESION")
           
           this.router.navigate(['/dashbordusuario']);
           console.log("el usuario no tiene activado 2FA");
          
        }else{
         this.correo2fa(correo,data.token);
         console.log("se le enviara un correo al usuario")
         //alert("SE LE ENVIARA UN CODIGO A SU CORREO")
        }

      });
      
    } catch (error) {
     
    this.AlertMensajes('Autenticacion','Error al intentar iniciar sesion','error','Ok',false,true,'--')
      //alert("ERROR AL INTENTAR MANDAR EL CODIGO AL CORREO: "+error);
    }

  }

  correo2fa(correo:string,key:string){
    this.servAuten.sendemail(correo,key).subscribe((data:any)=>{
      if(data.CorreoEnviado){
        this.AlertMensajes('Correo Electronico','Se te ha enviado un codigo a tu correo','info','Ok',false,true,'--')
        //alert("SE TE HA ENVIADO UN CODIGO A TU CORREO");
      }else{
        this.AlertMensajes('Correo Electronico','Error al enviarte un correo','error','Ok',false,true,'--')
        //alert("ERROR AL ENVIARTE UN CORREO");
      }
    });
  }

  validarkey(key:string){
    try {
      
    let nickname=this.LoginService.getLocalS().nickname;
    console.log("NICKNAME: "+nickname)
    if (nickname!=""){
    this.servAuten.validarkey(nickname.toString(),key.toString()).subscribe((data:any)=>{
      console.log("valor: "+data.valid," tipo: "+typeof(data.valid))
    
      if(data.valid){
        //alert("EL TOKEN ES VALIDO AUN");
        this.router.navigate(['/dashbordusuario']);
        console.log("inicio sesion con el codigo");
      }else{
        this.AlertMensajes('Codigo Autenticacion','El codigo ha caducado,inicie sesion nuevamente','warning','Ok',false,true,'--')
        //alert("EL TOKEN HA CADUCADO");
        this.router.navigate(['/']);
      }

    });

    }else{ 
      this.AlertMensajes('Verificacion Codigo','Sesion no iniciada, el codigo ya no es valido','warning','Ok',false,true,'--')
      //alert("YA CERRO SESION , EL CODIGO YA NO ES VALIDA")
    }

  } catch (error) {
    this.AlertMensajes('Verificacion Codigo','Ocurrio un error al verificar el codifo','error','Ok',false,true,'--')
      //alert("OCURRIO UN ERROR AL VERIFICAR EL CODIGO")
  }

  }

  modal(){
    this.showModalBox = true;
    //console.log("se deberia de mostrar el modal")
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
