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
  unProducto: Producto = new Producto(null, null, null, null, null, null, null, null, null);
  updateProductos: string = "";
  editar: boolean = false;
  scanner: boolean = false;
  busqueda = "";
  enVenta: boolean = false;
  filtro: string = '';
  idFiltrar: number = -1;

  //Metodos de productos

  getProductos() {

    let consulta = `select p.id as id,
    p.codigo as codigo, 
    p.nombre as nombre, 
    trunc(p.precio_venta,2) as precio_venta,
    trunc(p.precio_costo,2) as precio_costo,
    p.cantidad as cantidad, 
    p.descripcion as descripcion, 
    p.id_categoria as id_categoria, 
    p.foto as foto
    from productos p ${this.filtro} order by id desc limit 20`;
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      this.listadoProducto = res[1];
      this.buscarProducto(this.busqueda);
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }
  }

  verificarCodigoProducto(codigo: string) {
    const consulta = `SELECT codigo FROM PRODUCTOS WHERE codigo = '${codigo}';`;
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
    const consulta = `SELECT P.cantidad FROM PRODUCTOS P WHERE id = '${unProducto.id}';`;
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      return res[1][0].cantidad;
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
      return -1;
    }
  }

  buscarProducto(busqueda: string) {

    if (busqueda != '') {
      let consulta = `select p.id as id,
      p.codigo as codigo, 
      p.nombre as nombre, 
      trunc(p.precio_venta,2) as precio_venta,
      trunc(p.precio_costo,2) as precio_costo,
      p.cantidad as cantidad, 
      p.descripcion as descripcion, 
      p.id_categoria as id_categoria, 
      p.foto as foto
      from productos p `;
      if (this.filtro != '') {
        consulta += ` ${this.filtro} and (`;
      } else {
        consulta += ` where (`;
      }
      busqueda = busqueda.trim();
      let palabrasClaves = busqueda.split(' ');
      let primero = true;
      palabrasClaves.forEach(palabra => {
        if (primero) {
          consulta += ` (p.codigo ilike '%${palabra}%' or p.nombre ilike '%${palabra}%')`;
          primero = false;
        } else {
          consulta += ` or (p.codigo ilike '%${palabra}%' or p.nombre ilike '%${palabra}%')`;
        }
      });
      consulta += ` ) order by id desc limit 20;`;
      console.log(consulta);
      let res = this.ipc.ipcRenderer.sendSync('base', consulta);
      if (res[0] == 'ok') {
        this.listadoProducto = res[1];
      } else {
        alertify.notify('Error ' + res[1].code, 'warning', 5);
      }
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
    unProdcuto.descripcion = ((unProdcuto.descripcion != null && unProdcuto.descripcion != '') ? "'" + unProdcuto.descripcion + "'" : null);
    unProdcuto.foto = ((unProdcuto.foto != null && unProdcuto.foto != '') ? "'" + unProdcuto.foto + "'" : null);
    const consulta = `INSERT INTO PRODUCTOS (codigo,nombre,precio_costo,precio_venta,cantidad,descripcion,foto,id_categoria) VALUES ('${unProdcuto.codigo}','${unProdcuto.nombre}',${unProdcuto.precio_costo},${unProdcuto.precio_venta},${unProdcuto.cantidad},${unProdcuto.descripcion},${unProdcuto.foto},${unProdcuto.id_categoria});`;
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      this.getProductos();
      alertify.notify('Producto agregado', 'success', 5);
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }
  }

  borrarProducto(unProdcuto: Producto) {
    const consulta = `DELETE FROM PRODUCTOS WHERE id = '${unProdcuto.id}';`;
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
    unProdcuto.descripcion = ((unProdcuto.descripcion != null && unProdcuto.descripcion != '') ? "'" + unProdcuto.descripcion + "'" : null);
    unProdcuto.foto = ((unProdcuto.foto != null && unProdcuto.foto != '') ? "'" + unProdcuto.foto + "'" : null);
    const consulta = `UPDATE PRODUCTOS P SET codigo = '${unProdcuto.codigo}' , nombre = '${unProdcuto.nombre}', precio_costo = ${this.base.adaptarDecimal(unProdcuto.precio_costo)}, precio_venta = ${this.base.adaptarDecimal(unProdcuto.precio_venta)} , cantidad = ${unProdcuto.cantidad} , descripcion = ${unProdcuto.descripcion}, id_categoria = ${unProdcuto.id_categoria} , foto = ${unProdcuto.foto} WHERE P.id = '${unProdcuto.id}';`;
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
      this.filtro = `WHERE id_categoria is ${id}`;
    } else {
      if (id == -1) {
        this.filtro = '';
      } else {
        this.filtro = `WHERE id_categoria = ${id}`;
      }
    }
  }

}
