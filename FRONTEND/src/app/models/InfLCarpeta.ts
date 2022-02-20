
export interface ListCarpeta {
    
  nombre: string;
  fechaCreacion: string;
  numeroarchivos: number;
  

}

export interface ReporteInterface {
    
  metodoMiddleware: string;
  entrada: string;
  salida: string;
  esError: string;
  fechaHora: string;

}