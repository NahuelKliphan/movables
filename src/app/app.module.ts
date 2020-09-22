import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxElectronModule } from 'ngx-electron';

//Componentes
import { AppComponent } from './app.component';

//Menu
import { NavVarComponent } from './component/menu/nav-bar/nav-bar.component';
import { InicioComponent } from './component/menu/inicio/inicio.component';
import { ConfiguracionComponent } from './component/menu/configuracion/configuracion.component';
import { SidebarComponent } from './component/menu/sidebar/sidebar/sidebar.component';
import { ListaPreciosModificadosComponent } from './component/menu/lista-precios-modificados/lista-precios-modificados.component';
import { AboutComponent } from './component/menu/about/about.component';
import { VariablesComponent } from './component/variable/variables/variables.component';
//Producto
import { ProductoComponent } from 'src/app/component/producto/producto/producto.component';
import { FormProductoComponent } from 'src/app/component/producto/form-producto/form-producto.component';
import { ListaProductoComponent } from 'src/app/component/producto/lista-producto/lista-producto.component';
import { FormBorrarProductoComponent } from './component/producto/form-borrar-producto/form-borrar-producto.component';
import { ModificarPrecioProductoComponent } from './component/producto/modificar-precio-producto/modificar-precio-producto.component';
//Venta
import { VentaComponent } from './component/venta/venta/venta.component';
import { FormVentaComponent } from './component/venta/form-venta/form-venta.component';
import { ListaVentaComponent } from './component/venta/lista-venta/lista-venta.component';
import { FormBorrarVentaComponent } from './component/venta/form-borrar-venta/form-borrar-venta.component';
import { FormConfirmaImprimirComponent } from './component/venta/form-confirma-imprimir/form-confirma-imprimir.component';
//Item
import { ItemComponent } from './component/Item/item/item.component';
import { FormItemComponent } from './component/Item/form-item/form-item.component';
import { ListaItemComponent } from './component/Item/lista-item/lista-item.component';
import { FormCantidadComponent } from './component/Item/form-cantidad/form-cantidad.component';
//Categoria
import { CategoriaComponent } from './component/categoria/categoria/categoria.component';
import { FormCategoriaComponent } from './component/categoria/form-categoria/form-categoria.component';
import { ListaCategoriaComponent } from './component/categoria/lista-categoria/lista-categoria.component';
import { FormBorrarCategoriaComponent } from './component/categoria/form-borrar-categoria/form-borrar-categoria.component';
//Empresa
import { FormEmpresaComponent } from './component/empresa/form-empresa/form-empresa.component';
//Pipes
import { Buscar } from './pipes/buscar';
import { EditVariableComponent } from './component/variable/edit-variable/edit-variable.component';
import { EstadisticasVentasComponent } from './component/venta/estadisticas-ventas/estadisticas-ventas.component';


const routes: Routes = [
  {
    path: 'producto',
    component: ProductoComponent
  },
  {
    path: 'venta',
    component: VentaComponent
  },
  {
    path: 'listaVenta',
    component: ListaVentaComponent
  },
  {
    path: 'configuracion',
    component: ConfiguracionComponent
  },
  {
    path: 'categoria',
    component: CategoriaComponent
  },
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  }
];


@NgModule({
  declarations: [
    AppComponent,
    NavVarComponent,
    ProductoComponent,
    InicioComponent,
    ItemComponent,
    FormItemComponent,
    ListaItemComponent,
    VentaComponent,
    FormVentaComponent,
    ListaVentaComponent,
    FormProductoComponent,
    ListaProductoComponent,
    ConfiguracionComponent,
    CategoriaComponent,
    FormCategoriaComponent,
    ListaCategoriaComponent,
    SidebarComponent,
    FormBorrarProductoComponent,
    FormBorrarCategoriaComponent,
    FormCantidadComponent,
    ModificarPrecioProductoComponent,
    FormEmpresaComponent,
    ListaPreciosModificadosComponent,
    FormBorrarVentaComponent,
    Buscar,
    AboutComponent,
    VariablesComponent,
    EditVariableComponent,
    FormConfirmaImprimirComponent,
    EstadisticasVentasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes, { useHash: true }),
    NgxElectronModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
