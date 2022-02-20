import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../Servicios/login.service';
import { AutenticacionService } from '../../Servicios/autenticacion.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-two-factor',
  templateUrl: './two-factor.component.html',
  styleUrls: ['./two-factor.component.css']
})
export class TwoFactorComponent implements OnInit {

  datos={
    telefono:"",
    correo:""
    }

  constructor(private AutenService: AutenticacionService,private LoginService: LoginService,private router: Router) { }

  ngOnInit(): void {
  }

  activar(){

    try {
      let nickname=this.LoginService.getLocalS().nickname;
      this.AutenService.activarkey(nickname.toString()).subscribe((data:any)=>{

        if (data.TwoFactor){
          this.AlertMensajes('Activar 2FA','Se ha activado la autenticacion de dos factores','success','Ok',false,true,'--')
          //alert("SE ACTIVO LA AUTENTICACION DE DOS FACTORES !!!!")
        }else{
          this.AlertMensajes('Activar 2FA','No se pudo activar la autenticacion de dos factores de manera correcta','warning','Ok',false,true,'--')
          //alert("HUBO UN ERROR AL INTENTAR ACTIVAR LA AUTENTICACION DE DOS FACTORES !!!!")
        }

      });
      
    } catch (error) {
      this.AlertMensajes('Activar 2FA','Hubo un error al intentar activar la autenticacion de dos factores','error','Ok',false,true,'--')
      //alert("NO SE PUDO ACTIVAR LA AUTENTICACION DE DOS FACTORES DE MANERA CORRECTA:\n"+error)
    }
   
  //console.log(this.LoginService.getLocalS())

  }

  desactivar(){

    try {
      let nickname=this.LoginService.getLocalS().nickname;
      this.AutenService.desactivarkey(nickname.toString()).subscribe((data:any)=>{

        if (data.TwoFactor){
          this.AlertMensajes('Desactivar 2FA','Se ha desactivado la autenticacion de dos factores','success','Ok',false,true,'--')
          //alert("SE DESACTIVO LA AUTENTICACION DE DOS FACTORES !!!!")
        }else{
          this.AlertMensajes('Desactivar 2FA','No se pudo desactivar la autenticacion de dos factores de manera correcta','warning','Ok',false,true,'--')
          //alert("HUBO UN ERROR AL INTENTAR DESACTIVAR LA AUTENTICACION DE DOS FACTORES !!!!")
        }

      });
      
    } catch (error) {
      this.AlertMensajes('Desactivar 2FA','Hubo un error al intentar desactivar la autenticacion de dos factores','error','Ok',false,true,'--')
      //alert("NO SE PUDO DESACTIVAR LA AUTENTICACION DE DOS FACTORES DE MANERA CORRECTA:\n"+error)
    }

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
