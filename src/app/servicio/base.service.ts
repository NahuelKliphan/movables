import { Injectable } from '@angular/core';
import { Producto } from '../model/Producto';
import { ElectronService } from 'ngx-electron';
import { Categoria } from '../model/Categoria';
import { Item } from '../model/Item';
import { Venta } from '../model/Venta';
import { Empresa } from '../model/Empresa';
import { RegistroPrecio } from '../model/RegistroPrecio';


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
  scanner: boolean = false;

  //Producto
  listadoProducto: Producto[] = [];
  unProducto: Producto = new Producto(null, null, null, null, null, null, null);
  updateProductos: string = "";
  busqueda = "";

  //Categoria
  listadoNombreCategoria: string[] = [];
  listadoCategoria: Categoria[] = [];
  unaCategoria: Categoria = new Categoria(null, null);

  //Venta
  listadoVenta: Venta[] = [];
  unaVenta: Venta = new Venta(null, null, new Date(), 0);

  //Item
  listadoItem: Item[] = [];
  unItem: Item = new Item(null, null, null, null, null, 1, null);
  insertItems: string = "";
  idItemTemp = 0;

  //Empresa
  unaEmpresa = new Empresa(1, "", "", "", "", "", "", "", "");

  //RegistroPrecio
  unRegistroPrecio = new RegistroPrecio(null, null, null, null, null, null);
  listadoRegistroPrecio: RegistroPrecio[] = [];

  //Metodos globales
  adaptarDecimal(numero: number) {
    return Number(numero.toString().replace(',', '.'));
  }

  isNumber(value: string | number): boolean {
    return ((value != null) &&
      (value !== '') &&
      !isNaN(Number(value.toString())));
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
    const consulta = `SELECT * FROM PRODUCTOS ${this.filtro} ORDER BY OID DESC LIMIT 50`;
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      this.listadoProducto = res[1];
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
      this.getRegistroPrecios();
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }

  }

  guardarProducto(unProdcuto: Producto) {
    $('#formProducto').modal('hide');
    const consulta = `INSERT INTO PRODUCTOS (codigo,nombre,precio,cantidad,descripcion,foto,idcategoria) VALUES ('${unProdcuto.codigo}','${unProdcuto.nombre}',${unProdcuto.precio},${unProdcuto.cantidad},'${unProdcuto.descripcion}','${unProdcuto.foto}',${unProdcuto.idcategoria});`;
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
    const consulta = `UPDATE PRODUCTOS P SET nombre = '${unProdcuto.nombre}', precio = ${this.adaptarDecimal(unProdcuto.precio)} , cantidad = ${unProdcuto.cantidad} , descripcion = '${unProdcuto.descripcion}', idcategoria = ${unProdcuto.idcategoria} , foto = '${unProdcuto.foto}' WHERE P.codigo = '${unProdcuto.codigo}';`;
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
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
      alertify.notify('Categoria agregada', 'success', 5);
      this.getCategorias();
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }
  }

  borrarCategoria(unaCategoria: Categoria) {
    const consulta = `DELETE FROM CATEGORIAS WHERE id = '${unaCategoria.id}';`;
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      alertify.notify('Categoria eliminada', 'error', 5);
      this.getCategorias();
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }
  }

  editarCategoria(unaCategoria: Categoria) {
    const consulta = `UPDATE CATEGORIAS SET nombre = '${unaCategoria.nombre}' WHERE id = ${unaCategoria.id};`;
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      alertify.notify('Categoria editada', 'success', 5);
      this.getCategorias();
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }
  }

  //Metodos de Venta

  getVentas() {
    const consulta = "SELECT * FROM VENTAS ORDER BY fecha DESC";
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      this.listadoVenta = res[1];
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }
  }

  guardarVenta(unaVenta: Venta) {
    this.insertItems = "";
    this.updateProductos = "";
    const consulta = `INSERT INTO VENTAS (clientenombre, fecha, total) VALUES ('${unaVenta.clientenombre}','${new Date().toDateString()}', ${unaVenta.total}) RETURNING ID;`;
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      let id = res[1][0].id;
      this.listadoItem.forEach(unItem => {
        unItem.idventa = id;
        this.insertItems = this.insertItems + `INSERT INTO ITEMS (idventa, total, codigo, nombre, cantidad, precio) values (${unItem.idventa},${unItem.total},'${unItem.codigo}','${unItem.nombre}',${unItem.cantidad},${unItem.precio});`;
        this.updateProductos = this.updateProductos + `UPDATE PRODUCTOS P SET cantidad = cantidad - ${unItem.cantidad}  WHERE P.codigo = '${unItem.codigo}';`;
      });
      this.guardarItemsActualizarCantidad(this.insertItems + this.updateProductos);
      this.updateProductos = "";
      this.insertItems = "";
      this.getProductos();
      alertify.notify('Vendido', 'success', 5);
      this.listadoItem = [];
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }
  }

  borrarVenta(unaVenta: Venta) {
    const consulta = `DELETE FROM VENTAS WHERE id = '${unaVenta.id}';`;
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      this.getVentas();
      alertify.notify('Venta eliminada', 'error', 5);
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }
  }

  //Metodos de Item

  guardarItemsActualizarCantidad(consulta: string) {
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'error') {
      alertify.notify('Error al guardar items' + res[1].code, 'warning', 5);
    }
  }

  //Metodos Empresa

  existeEmpresa(unaEmpresa: Empresa) {
    const consulta = `SELECT * FROM ENTIDADES WHERE id = '${unaEmpresa.id}';`;
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      if (res[1].length > 0) {
        return true;
      }
      else {
        return false;
      }
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }
  }

  getEmpresa() {

    const consulta = `SELECT * FROM ENTIDADES WHERE id = 1`;
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      this.unaEmpresa = res[1][0];
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }

  }

  guardarEmpresa(unaEmpresa: Empresa) {
    const consulta = `INSERT INTO ENTIDADES (id, nombre, direccion, telefono, mail, cuit, facebook, instagram, twitter) 
    values (${unaEmpresa.id},'${unaEmpresa.nombre}','${unaEmpresa.direccion}','${unaEmpresa.telefono}','${unaEmpresa.mail}','${unaEmpresa.cuit}','${unaEmpresa.facebook}','${unaEmpresa.instagram}','${unaEmpresa.twitter}');`;
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      alertify.notify('Empresa guardada', 'success', 5);
      this.getEmpresa();
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }
  }

  editarEmpresa(unaEmpresa: Empresa) {
    const consulta = `UPDATE ENTIDADES E SET nombre = '${unaEmpresa.nombre}', direccion = '${unaEmpresa.direccion}', telefono = '${unaEmpresa.telefono}', mail = '${unaEmpresa.mail}', cuit = '${unaEmpresa.cuit}', facebook = '${unaEmpresa.facebook}', instagram = '${unaEmpresa.instagram}', twitter = '${unaEmpresa.twitter}' WHERE E.id = '${unaEmpresa.id}';`;
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      this.getEmpresa();
      alertify.notify('Empresa editado', 'success', 5);
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }
  }

  //Metodos Registro Precios

  getRegistroPrecios() {
    const consulta = "SELECT * FROM REGISTRO_PRECIOS WHERE anulada = 'N' ORDER BY id DESC limit 50;";
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      this.listadoRegistroPrecio = res[1];
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    }
  }

  deshacerPrecios(unRegistro: RegistroPrecio) {

    let consulta = `UPDATE REGISTRO_PRECIOS RP SET anulada = 'S' WHERE id = ${unRegistro.id};`;
    consulta += "UPDATE PRODUCTOS SET PRECIO = PRECIO ";
    if (unRegistro.operacion =="Aumento") {
      consulta += '- ';
    } else {
      consulta += '+ ';
    }
    if (unRegistro.tipo_valor == "Porcentaje") {
      consulta += `PRECIO * ${unRegistro.valor} `;
    } else {
      consulta += `${unRegistro.valor} `;
    }
    this.setFiltro(unRegistro.id_categoria);
    consulta += this.filtro + ";"
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      this.getRegistroPrecios();
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
    } 
    
  }

  esUltimoRegistroPrecio(id: number) {

    const consulta = "SELECT id FROM REGISTRO_PRECIOS WHERE anulada = 'N' ORDER BY id DESC limit 1";
    let res = this.ipc.ipcRenderer.sendSync('base', consulta);
    if (res[0] == 'ok') {
      if (res[1][0].id == id) {
        return true;
      } else {
        return false;
      }
    } else {
      alertify.notify('Error ' + res[1].code, 'warning', 5);
      return false;
    }

  }

}


