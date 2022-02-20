import { Component, OnInit } from '@angular/core';
import { ReporteInterface } from '../../models/InfLCarpeta'
import { RegistroService  } from '../../Servicios/registro.service';

@Component({
  selector: 'app-reporte-logs',
  templateUrl: './reporte-logs.component.html',
  styleUrls: ['./reporte-logs.component.css']
})
export class ReporteLogsComponent implements OnInit {

  constructor( private servicoReporte:RegistroService) { }

 

  ngOnInit(): void {
    this.TablaReporte()
  }

  Reporte: ReporteInterface [] = [];

  TablaReporte(){
    this.servicoReporte.listarReporte().subscribe((res:any)=>{
      this.Reporte=res;
    });
  }



}
