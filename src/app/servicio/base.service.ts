import { Injectable } from '@angular/core';
import { Producto } from '../model/Producto';
import { ElectronService } from 'ngx-electron';
import { Categoria } from '../model/Categoria';
import { Item } from '../model/Item';
import { Venta } from '../model/Venta';

declare var alertify: any;
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private ipc: ElectronService) {

  }

  //Variables globales

  editar: boolean = false;
  filtro: string = '';
  idFiltrar: number = -1;
  enVenta: boolean = false;

  //Producto
  listadoProducto: Producto[] = [];
  unProducto: Producto = new Producto(null, null, null, null, null, null, null);

  //Categoria
  listadoNombreCategoria: string[] = [];
  listadoCategoria: Categoria[] = [];
  unaCategoria: Categoria = new Categoria(null, null);

  //Venta
  listadoVenta: Venta[] = [];
  unaVenta: Venta = new Venta(null, null, null, null);

  //Item
  listadoItem: Item[] = [];
  unItem: Item = new Item(null, null, null, null, null, null, null);

  //Metodos globales
  adaptarDecimal(numero: number) {
    return Number(numero.toString().replace(',', '.'));
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

  cerrar() {
    this.ipc.ipcRenderer.send('salir');
  }

  //Metodos de productos

  getProductos() {
    const consulta = `SELECT * FROM PRODUCTOS ${this.filtro} ORDER BY OID DESC LIMIT 100`;
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      this.listadoProducto = res[1];
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }
  }

  verificarCodigo(codigo: string) {
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

  buscarProducto(cod: string) {

    let consulta = "";

    if (this.idFiltrar == -1) {
      consulta = `SELECT * FROM PRODUCTOS P WHERE P.codigo ilike '%${cod}%' or p.nombre ilike '%${cod}%' LIMIT 20`;
    }
    else {

      if (this.idFiltrar == null) {
        consulta = `SELECT * FROM PRODUCTOS P WHERE (P.codigo ilike '%${cod}%' or p.nombre ilike '%${cod}%') and P.idcategoria is ${this.idFiltrar} LIMIT 20`;
      } else {
        consulta = `SELECT * FROM PRODUCTOS P WHERE (P.codigo ilike '%${cod}%' or p.nombre ilike '%${cod}%') and P.idcategoria = ${this.idFiltrar} LIMIT 20`;
      }

    }

    let res = this.ipc.ipcRenderer.sendSync('base', consulta);

    if (res[0] == 'ok') {
      this.listadoProducto = res[1];
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }

  }

  guardarProducto(unProdcuto: Producto) {
    const consulta = `INSERT INTO PRODUCTOS (codigo,nombre,precio,cantidad,descripcion,foto,idcategoria) VALUES ('${unProdcuto.codigo}','${unProdcuto.nombre}',${unProdcuto.precio},${unProdcuto.cantidad},'${unProdcuto.descripcion}','${unProdcuto.foto}',${unProdcuto.idcategoria});`;
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      $('#formProducto').modal('hide');
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
      $('#formBorrarProducto').modal('hide');
      this.getProductos();
      alertify.notify('Producto eliminado', 'error', 5);
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }
  }

  editarProducto(unProdcuto: Producto) {
    const consulta = `UPDATE PRODUCTOS P SET nombre = '${unProdcuto.nombre}', precio = ${this.adaptarDecimal(unProdcuto.precio)} , cantidad = ${unProdcuto.cantidad} , descripcion = '${unProdcuto.descripcion}', idcategoria = ${unProdcuto.idcategoria} , foto = '${unProdcuto.foto}' WHERE P.codigo = '${unProdcuto.codigo}';`;
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      $('#formProducto').modal('hide');
      this.getProductos();
      alertify.notify('Producto editado', 'success', 5);
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }
  }

  //Metodos de Categoria

  getCategorias() {
    const consulta = "SELECT * FROM CATEGORIAS ORDER BY OID DESC";
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      this.listadoCategoria = res[1];
      this.listadoCategoria.forEach(c => { this.listadoNombreCategoria[c.id] = c.nombre });
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }
  }

  verificarNombre(nombre: string) {
    const consulta = `SELECT * FROM CATEGORIAS WHERE nombre = '${nombre}';`;
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      if (res[1].length == 0) {
        return true;
      }
      else {
        alertify.notify('Nombre repetido', 'error', 5);
        return false;
      }
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }
  }

  guardarCategoria(unaCategoria: Categoria) {
    const consulta = `INSERT INTO CATEGORIAS (nombre) values ('${unaCategoria.nombre}');`;
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      this.getCategorias();
      alertify.notify('Categoria agregada', 'success', 5);
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }
  }

  borrarCategoria(unaCategoria: Categoria) {
    const consulta = `DELETE FROM CATEGORIAS WHERE id = '${unaCategoria.id}';`;
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      this.getCategorias();
      alertify.notify('Categoria eliminada', 'error', 5);
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }
  }

  editarCategoria(unaCategoria: Categoria) {
    const consulta = `UPDATE CATEGORIAS SET nombre = '${unaCategoria.nombre}' WHERE id = ${unaCategoria.id};`;
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      this.getCategorias();
      alertify.notify('Categoria editada', 'success', 5);
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }
  }

}


