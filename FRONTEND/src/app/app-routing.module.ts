import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioSesionComponent } from './componentes/inicio-sesion/inicio-sesion.component'
import { RegistroUsuarioComponent } from './componentes/registro-usuario/registro-usuario.component'
import { PerfilUsuarioComponent } from './componentes/perfil-usuario/perfil-usuario.component'
import { MenuUsuarioComponent } from './componentes/menu-usuario/menu-usuario.component'
import { GestorCarpetasComponent } from './componentes/gestor-carpetas/gestor-carpetas.component'
import { GestorArchivosComponent } from './componentes/gestor-archivos/gestor-archivos.component'
import { ReporteLogsComponent } from './componentes/reporte-logs/reporte-logs.component'
import { PapeleraUsuarioComponent } from './componentes/papelera-usuario/papelera-usuario.component';
import { TwoFactorComponent } from './componentes/two-factor/two-factor.component';

const routes: Routes = [
  { path: '',
    component: InicioSesionComponent

  },
  {
    path:'iniciosesion',
    component:InicioSesionComponent

  },
  {
    path:'registrousuario',
    component:RegistroUsuarioComponent

  },
  {
    path:'perfilusuario',
    component:PerfilUsuarioComponent

  },
  {
    path:'dashbordusuario',
    component:MenuUsuarioComponent

  },
  {
    path:'gestorcarpetas',
    component:GestorCarpetasComponent

  }
  ,
  {
    path:'gestorarchivos',
    component:GestorArchivosComponent

  }
  ,
  {
    path:'reportelogs',
    component: ReporteLogsComponent
  }
  ,
  {
    path:'papelerausuario',
    component: PapeleraUsuarioComponent
  }
  ,
  {
    path:'autenticacion',
    component: TwoFactorComponent
  }

];
/*const routes: Routes = [

  {
    path:'',
    loadChildren:() =>
    import('./componentes/inicio-sesion/inicio-sesion.component').then((m) => m.InicioSesionComponent)
  },
  {
    path:'iniciosesion',
    component:InicioSesionComponent

  },
  {
    path:'registrousuario',
    component:RegistroUsuarioComponent

  },
  {
    path:'perfilusuario',
    component:PerfilUsuarioComponent

  },
  {
    path:'menuusuario',
    component:MenuUsuarioComponent

  }
];*/

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
