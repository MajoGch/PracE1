import { ConversionesComponent } from './conversiones/conversiones.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { CategoriasComponent } from './categorias/categorias.component';
import {ArticuloComponent } from './articulo/articulo.component';


export const routes: Routes = [
    {path:'',redirectTo:'/home',pathMatch:'full'},
    {path:'home',component:HomeComponent},
    {path:'actividades',component:ActividadesComponent},
    {path:'categoria',component:CategoriasComponent},
    {path:'conversiones',component:ConversionesComponent},
    {path:'articulo',component:ArticuloComponent},
];

