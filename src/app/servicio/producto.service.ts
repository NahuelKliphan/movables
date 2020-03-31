import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { BaseService } from 'src/app/servicio/base.service';
import { Producto } from '../model/Producto';
import { RegistroPrecioService } from './registro-precio.service';

declare var alertify: any;
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private ipc: ElectronService, private base: BaseService, private registroPrecio: RegistroPrecioService) { }

  //Variables globales
  listadoProducto: Producto[] = [];
  unProducto: Producto = new Producto(null, null, null, null, null, null, null, null);
  updateProductos: string = "";
  editar: boolean = false;
  scanner: boolean = false;
  busqueda = "";
  enVenta: boolean = false;
  filtro: string = '';
  idFiltrar: number = -1;

  //Metodos de productos

  getProductos() {
    const consulta = `SELECT * FROM PRODUCTOS ${this.filtro} LIMIT 50`;
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      this.listadoProducto = res[1];
      this.buscarProducto(this.busqueda);
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }
  }

  verificarCodigoProducto(codigo: string) {
    const consulta = `SELECT * FROM PRODUCTOS WHERE codigo = '${codigo}';`;
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      if (res[1].length == 0) {
        return true;
      }
      else {
        alertify.notify('Codigo repetido', 'error', 5);
        return false;
      }
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }

  }

  consultarCantidadProducto(unProducto: Producto) {
    const consulta = `SELECT P.cantidad FROM PRODUCTOS P WHERE codigo = '${unProducto.codigo}';`;
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      return res[1][0].cantidad;
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
      return -1;
    }
  }

  buscarProducto(cod: string) {

    let consulta = "";

    if (this.idFiltrar == -1) {
      consulta = `SELECT * FROM PRODUCTOS P WHERE P.codigo ilike '%${cod}%' or p.nombre ilike '%${cod}%' LIMIT 20;`;
    }
    else {

      if (this.idFiltrar == null) {
        consulta = `SELECT * FROM PRODUCTOS P WHERE (P.codigo ilike '%${cod}%' or p.nombre ilike '%${cod}%') and P.idcategoria is ${this.idFiltrar} LIMIT 20;`;
      } else {
        consulta = `SELECT * FROM PRODUCTOS P WHERE (P.codigo ilike '%${cod}%' or p.nombre ilike '%${cod}%') and P.idcategoria = ${this.idFiltrar} LIMIT 20;`;
      }

    }

    let res = this.ipc.ipcRenderer.sendSync('base', consulta);

    if (res[0] == 'ok') {
      this.listadoProducto = res[1];
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }

  }

  modificarPrecioProducto(consulta: string) {

    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      alertify.notify('Precios modificados', 'success', 5);
      this.registroPrecio.getRegistroPrecios();
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }

  }

  guardarProducto(unProdcuto: Producto) {
    $('#formProducto').modal('hide');
    const consulta = `INSERT INTO PRODUCTOS (codigo,nombre,precio_costo,precio_venta,cantidad,descripcion,foto,idcategoria) VALUES ('${unProdcuto.codigo}','${unProdcuto.nombre}',${unProdcuto.precio_costo},${unProdcuto.precio_venta},${unProdcuto.cantidad},'${unProdcuto.descripcion}','${unProdcuto.foto}',${unProdcuto.idcategoria});`;
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      this.getProductos();
      alertify.notify('Producto agregado', 'success', 5);
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }
  }

  borrarProducto(unProdcuto: Producto) {
    const consulta = `DELETE FROM PRODUCTOS WHERE codigo = '${unProdcuto.codigo}';`;
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      this.getProductos();
      alertify.notify('Producto eliminado', 'error', 5);
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }
  }

  editarProducto(unProdcuto: Producto) {
    $('#formProducto').modal('hide');
    const consulta = `UPDATE PRODUCTOS P SET nombre = '${unProdcuto.nombre}', precio_costo = ${this.base.adaptarDecimal(unProdcuto.precio_costo)}, precio_venta = ${this.base.adaptarDecimal(unProdcuto.precio_venta)} , cantidad = ${unProdcuto.cantidad} , descripcion = '${unProdcuto.descripcion}', idcategoria = ${unProdcuto.idcategoria} , foto = '${unProdcuto.foto}' WHERE P.codigo = '${unProdcuto.codigo}';`;
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      this.getProductos();
      alertify.notify('Producto editado', 'success', 5);
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }
  }

  setFiltro(id: number) {

    if (id == null) {
      this.filtro = `WHERE idcategoria is ${id}`;
    } else {
      if (id == -1) {
        this.filtro = '';
      } else {
        this.filtro = `WHERE idcategoria = ${id}`;
      }
    }
  }

}
