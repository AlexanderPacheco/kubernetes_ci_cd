export interface Persona {

    nickname: String;
    correo:     String;
    fechaNacimiento: String;
    contrasena: String;


}

export interface Carpeta {

  nombre: String;

}

export interface Link{
  link:{
    S:String
  }
}

export interface Archivos{
  eliminado: Number,
  extension: String,
  fechaSubida: String,
  link: String,
  nombre: String

}
