import { Component, OnInit } from '@angular/core';
import {PerfilUsuarioService} from "./perfil-usuario.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../Servicios/login.service";
import { RegistroService } from '../../Servicios/registro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  public usuario = {nickname:"", correo:"", fechaNacimiento:"", contrasena:""};
  public usuario_actualizado:any;

  FormPerfil = new FormGroup({
    correo : new FormControl('',Validators.required),
    fechaNacimiento : new FormControl('',Validators.required),
    contrasena : new FormControl('',Validators.required),
    confirmar : new FormControl('',Validators.required),
  });

  constructor(private servicio_registro:RegistroService,private perfilUsuarioService:PerfilUsuarioService,private storage_user: LoginService) { }

  ngOnInit(): void {
    this.mostrarUsuario(this.storage_user.getLocalS().nickname.toString());
  }

  mostrarUsuario(nickname:string){
    this.perfilUsuarioService.mostrarUsuario(nickname).subscribe((data:any)=>{
      this.usuario.nickname = data.Item.nickname;
      this.usuario.correo = this.perfilUsuarioService.decrypt(data.Item.correo.toString());
      this.usuario.fechaNacimiento = data.Item.fechaNacimiento;
      this.usuario.contrasena = this.servicio_registro.decrypt(data.Item.contrasena);
      this.usuario_actualizado = data.Item;
    });
  }

  cambios() {
    var cambio = true;
    if(this.usuario.correo != this.FormPerfil.value.correo && this.FormPerfil.value.correo != ""){
      this.usuario_actualizado.correo = this.servicio_registro.encrypt(this.FormPerfil.value.correo);
    
    }else{
      if(this.FormPerfil.value.correo == ""){
        this.AlertMensajes('Alerta','El campo de "Correo" es obligatorio','warning','Ok',false,true,'--')
        cambio = false;
      }
    }

    if(this.usuario.fechaNacimiento != this.FormPerfil.value.fechaNacimiento  && this.FormPerfil.value.fechaNacimiento != ""){
      this.usuario_actualizado.fechaNacimiento = this.FormPerfil.value.fechaNacimiento;
    }else{
      if(this.FormPerfil.value.fechaNacimiento == ""){
        this.AlertMensajes('Alerta','El campo de "Fecha de nacimiento" es obligatorio','warning','Ok',false,true,'--')
        cambio = false;
      }
    }

    if(this.usuario.contrasena != this.FormPerfil.value.contrasena && this.FormPerfil.value.contrasena != "" ){
      if(this.FormPerfil.value.confirmar != this.FormPerfil.value.contrasena){
        this.AlertMensajes('Error','Las contraseñas no coinciden','error','Ok',false,true,'--')
        //console.log("contrasenas no coinciden")
        return;
      }
      this.usuario_actualizado.contrasena = this.servicio_registro.encrypt(this.FormPerfil.value.contrasena);
      
    }else{
      if(this.FormPerfil.value.contrasena == ""){
        //this.AlertMensajes('Alerta','El campo de "Contraseña" es obligatorio','warning','Ok',false,true,'--')
        this.usuario_actualizado.contrasena = this.servicio_registro.encrypt(this.usuario.contrasena);
      }
      
      //cambio = false;
    }

    

    if(cambio){

      console.log(this.usuario_actualizado);
 
        this.perfilUsuarioService.post_actualizar(this.usuario_actualizado).subscribe((data:any)=>{

          if(data.status==='Resistro de usuario con exito'){
            this.AlertMensajes('Actualizar','Se actualizaron los datos correctamente','success','Ok',false,true,'--')
          }else{
            this.AlertMensajes('Actualizar','Ocurrio un error al intentar actualizar','error','Ok',false,true,'--')
          }
          
          console.log(data);
          console.log('actualizadoo :)')
        });

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
