import { environment } from "../../environments/environment";

export default class RutasGestorCarpetas{

  private static instance: RutasGestorCarpetas;

  private static RegistroUsuario: string;
  private static EditarCarpeta: string;
  private static ListarCarpeta: string;
  private static LlaveSecreta: string;
  private static Reporte: string

  private constructor (){

  }

  private static inicializar(): void{
    this.RegistroUsuario = environment.API_REGISTRO_USUARIO;
    this.EditarCarpeta = environment.API_EDITAR_CARPETA;
    this.ListarCarpeta = environment.API_LISTAR_CARPETA;
    this.LlaveSecreta = environment.LLAVE_ENCRIPTACION;
    this.Reporte = environment.API_LISTAR_REPORTE;

  }

  public static getInstance(): RutasGestorCarpetas{

    if(!this.instance){
      this.inicializar();
      this.instance = new RutasGestorCarpetas();
    }

    return this.instance;
  }

  get registro_usuario_url(): string{
    return RutasGestorCarpetas.RegistroUsuario;
  }

  get editar_carpeta_url(): string{
    return RutasGestorCarpetas.EditarCarpeta;
  }

  get listar_carpeta_url(): string{
    return RutasGestorCarpetas.ListarCarpeta;
  }

  get llave_secreta_url(): string{
    return RutasGestorCarpetas.LlaveSecreta;
  }

  get listar_reporte_url(): string{
    return RutasGestorCarpetas.Reporte;
  }

  
}