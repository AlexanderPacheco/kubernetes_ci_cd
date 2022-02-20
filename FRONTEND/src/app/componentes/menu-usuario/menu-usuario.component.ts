import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-usuario',
  templateUrl: './menu-usuario.component.html',
  styleUrls: ['./menu-usuario.component.css']
})
export class MenuUsuarioComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  cerrar_sesion(){
    localStorage.removeItem("Logueado");
    this.router.navigate(['/']);
  }

}
