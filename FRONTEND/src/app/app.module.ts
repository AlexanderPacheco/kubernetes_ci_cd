import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {HttpClient, HttpClientModule } from '@angular/common/http'//se importo tambien, no venia por defecto , para la comunicacion con la api

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioSesionComponent } from './componentes/inicio-sesion/inicio-sesion.component';
import { RegistroUsuarioComponent } from './componentes/registro-usuario/registro-usuario.component';
import { PerfilUsuarioComponent } from './componentes/perfil-usuario/perfil-usuario.component';
import { MenuUsuarioComponent } from './componentes/menu-usuario/menu-usuario.component';
import { GestorCarpetasComponent } from './componentes/gestor-carpetas/gestor-carpetas.component';
import { GestorArchivosComponent } from './componentes/gestor-archivos/gestor-archivos.component';
import { ReporteLogsComponent } from './componentes/reporte-logs/reporte-logs.component';

import { FormUploadComponent } from './upload/form-upload/form-upload.component';
import { PapeleraUsuarioComponent } from './componentes/papelera-usuario/papelera-usuario.component';
import { TwoFactorComponent } from './componentes/two-factor/two-factor.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioSesionComponent,
    RegistroUsuarioComponent,
    PerfilUsuarioComponent,
    MenuUsuarioComponent,
    GestorCarpetasComponent,
    GestorArchivosComponent,
    FormUploadComponent,
    ReporteLogsComponent,
    PapeleraUsuarioComponent,
    TwoFactorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
